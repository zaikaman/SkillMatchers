'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/dashboard/Dashboard'
import { getProfile } from '@/lib/actions'
import toast from 'react-hot-toast'
import { Profile } from '@/lib/actions'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getProfile()
        setProfile(profileData)
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Please login to access dashboard')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return null
  }

  const userData = {
    name: profile.full_name,
    matches: 5, // Tạm thời để số cứng, sau này sẽ lấy từ database
    unreadMessages: 3,
    upcomingInterviews: 2
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard 
        userType={profile.role}
        userData={userData}
      />
    </main>
  )
} 