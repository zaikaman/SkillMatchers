'use client'

import { useEffect, useState } from 'react'

interface PingResponse {
  success: boolean
  message?: string
  error?: string
  timestamp: string
  hasData?: boolean
}

interface UseDatabasePingOptions {
  enabled?: boolean
  intervalMs?: number
  onSuccess?: (response: PingResponse) => void
  onError?: (error: Error) => void
}

export function useDatabasePing(options: UseDatabasePingOptions = {}) {
  const {
    enabled = true,
    intervalMs = 60000, // 1 phút = 60000ms
    onSuccess,
    onError
  } = options

  const [isActive, setIsActive] = useState(enabled)
  const [lastPing, setLastPing] = useState<string | null>(null)
  const [consecutiveErrors, setConsecutiveErrors] = useState(0)
  const [status, setStatus] = useState<'idle' | 'pinging' | 'success' | 'error'>('idle')

  const pingDatabase = async () => {
    if (!isActive) return

    try {
      setStatus('pinging')
      
      const response = await fetch('/api/ping-db', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data: PingResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      setStatus('success')
      setLastPing(data.timestamp)
      setConsecutiveErrors(0)
      onSuccess?.(data)

      console.log('✅ Database ping successful:', data.timestamp)

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown ping error')
      setStatus('error')
      setConsecutiveErrors(prev => prev + 1)
      onError?.(err)

      console.error('❌ Database ping failed:', err.message)

      // Nếu lỗi liên tiếp > 5 lần, tạm dừng ping trong 5 phút
      if (consecutiveErrors >= 5) {
        console.warn('⚠️ Too many consecutive ping errors, pausing for 5 minutes...')
        setIsActive(false)
        setTimeout(() => {
          setIsActive(true)
          setConsecutiveErrors(0)
        }, 5 * 60 * 1000) // 5 phút
      }
    }
  }

  useEffect(() => {
    if (!isActive) return

    // Ping ngay lập tức khi start
    pingDatabase()

    // Sau đó ping theo interval
    const interval = setInterval(pingDatabase, intervalMs)

    return () => {
      clearInterval(interval)
    }
  }, [isActive, intervalMs])

  return {
    isActive,
    lastPing,
    consecutiveErrors,
    status,
    startPing: () => setIsActive(true),
    stopPing: () => setIsActive(false),
    pingNow: pingDatabase,
  }
}
