'use client'

import { useDatabasePing } from '@/hooks/useDatabasePing'
import { useState } from 'react'

interface DatabasePingMonitorProps {
  showDetails?: boolean
  enabled?: boolean
  className?: string
}

export function DatabasePingMonitor({ 
  showDetails = false, 
  enabled = true,
  className = ''
}: DatabasePingMonitorProps) {
  const [showLog, setShowLog] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const { 
    isActive, 
    lastPing, 
    consecutiveErrors, 
    status,
    startPing,
    stopPing,
    pingNow
  } = useDatabasePing({
    enabled,
    intervalMs: 60000, // 1 phút
    onSuccess: (response) => {
      if (showDetails) {
        setLogs(prev => [...prev.slice(-19), `✅ ${response.timestamp}: Ping thành công`])
      }
    },
    onError: (error) => {
      if (showDetails) {
        setLogs(prev => [...prev.slice(-19), `❌ ${new Date().toISOString()}: ${error.message}`])
      }
    }
  })

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-500'
      case 'error': return 'text-red-500'
      case 'pinging': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'pinging': return '🔄'
      default: return '⏸️'
    }
  }

  if (!showDetails) {
    // Chế độ compact - chỉ hiển thị indicator nhỏ
    return (
      <div className={`inline-flex items-center gap-1 text-xs ${className}`} title={`Database ping: ${status}`}>
        <span className={getStatusColor()}>{getStatusIcon()}</span>
        {lastPing && (
          <span className="text-gray-500">
            {new Date(lastPing).toLocaleTimeString('vi-VN')}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Database Connection Monitor</h3>
        <div className="flex items-center gap-2">
          {isActive ? (
            <button
              onClick={stopPing}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200"
            >
              Tạm dừng
            </button>
          ) : (
            <button
              onClick={startPing}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200"
            >
              Bắt đầu
            </button>
          )}
          <button
            onClick={pingNow}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            disabled={status === 'pinging'}
          >
            Ping ngay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-600">Trạng thái</div>
          <div className={`flex items-center gap-2 ${getStatusColor()}`}>
            <span>{getStatusIcon()}</span>
            <span className="capitalize">{status}</span>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Lần ping cuối</div>
          <div className="text-sm">
            {lastPing ? new Date(lastPing).toLocaleString('vi-VN') : 'Chưa ping'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Lỗi liên tiếp</div>
          <div className={`text-sm ${consecutiveErrors > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {consecutiveErrors}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Trạng thái hoạt động</div>
          <div className={`text-sm ${isActive ? 'text-green-600' : 'text-gray-600'}`}>
            {isActive ? 'Đang hoạt động' : 'Tạm dừng'}
          </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div>
          <button
            onClick={() => setShowLog(!showLog)}
            className="mb-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {showLog ? 'Ẩn' : 'Hiển thị'} log ping ({logs.length})
          </button>
          
          {showLog && (
            <div className="bg-gray-50 rounded-md p-3 max-h-40 overflow-y-auto">
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="text-xs font-mono text-gray-700">
                    {log}
                  </div>
                ))}
              </div>
              {logs.length > 0 && (
                <button
                  onClick={() => setLogs([])}
                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                >
                  Xóa log
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
