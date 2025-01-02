'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/dashboard/Dashboard'
import { getProfile } from '@/lib/actions'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        await getProfile()
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Please login to access dashboard')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Normally this would come from your backend/API
  const mockUserData = {
    name: "Alex Johnson",
    matches: 5,
    unreadMessages: 3,
    upcomingInterviews: 2
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard 
        userType="employer"
        userData={mockUserData}
      />
    </main>
  )
} 