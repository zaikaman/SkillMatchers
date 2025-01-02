'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile, type Profile } from '@/lib/actions'

interface ProfileContextType {
  profile: Profile | null
  loading: boolean
  error: Error | null
  refreshProfile: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  error: null,
  refreshProfile: async () => {}
})

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProfile()
      setProfile(data)
    } catch (err) {
      console.error('Error loading profile:', err)
      setError(err instanceof Error ? err : new Error('Failed to load profile'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        refreshProfile: loadProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
} 