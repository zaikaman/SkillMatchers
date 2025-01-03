'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/dashboard/Dashboard'
import Loading from '@/components/Loading'
import { getProfile, getNewMatchesCount, getUnreadMessagesCount } from '@/lib/actions'
import toast from 'react-hot-toast'
import { Profile } from '@/lib/actions'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [newMatches, setNewMatches] = useState(0)
  const [unreadMessages, setUnreadMessages] = useState(0)

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, matchesCount, messagesCount] = await Promise.all([
          getProfile(),
          getNewMatchesCount(),
          getUnreadMessagesCount()
        ])
        setProfile(profileData)
        setNewMatches(matchesCount)
        setUnreadMessages(messagesCount)
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Please login to access dashboard')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  if (loading) {
    return <Loading />
  }

  if (!profile) {
    return null
  }

  const userData = {
    name: profile.full_name,
    matches: newMatches,
    unreadMessages: unreadMessages
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