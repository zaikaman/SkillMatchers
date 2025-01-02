'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getProfile, updateProfile, uploadAvatar } from '@/lib/actions'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/lib/actions'
import { PencilIcon, CheckIcon, XMarkIcon, CameraIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function AccountPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({})
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await getProfile()
        setProfile(profileData)
        setEditedProfile(profileData)

        const { data: { user } } = await supabase.auth.getUser()
        setEmail(user?.email || null)
      } catch (error) {
        console.error('Error loading profile:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(profile || {})
    }
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      await updateProfile(editedProfile)
      setProfile({ ...profile, ...editedProfile } as Profile)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingAvatar(true)
      const avatarUrl = await uploadAvatar(file)
      setProfile({ ...profile, avatar_url: avatarUrl } as Profile)
      toast.success('Avatar updated successfully')
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast.error('Failed to upload avatar')
    } finally {
      setUploadingAvatar(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="heading-lg gradient-text">Your Account</h1>
        <Link 
          href="/dashboard" 
          className="btn-primary flex items-center gap-2"
        >
          <span>Go Dashboard</span>
          <span className="text-xl">🏠</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          {/* Profile Header */}
          <div className="relative px-8 pb-8">
            <div className="flex justify-between items-start">
              {/* Avatar Section */}
              <div className="relative -mt-20">
                <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  {uploadingAvatar ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      {profile?.avatar_url ? (
                        <Image
                          src={profile.avatar_url}
                          alt={profile.full_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-4xl text-indigo-600">
                            {profile?.full_name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <CameraIcon className="w-5 h-5 text-gray-600" />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <CheckIcon className="w-5 h-5" />
                      Save
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="mt-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.full_name || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h1>
              )}
              <p className="text-gray-600 mt-1">{email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {profile?.role === 'worker' ? 'Job Seeker' : 'Employer'}
              </span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* About Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">About</h2>
                </div>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    className="w-full h-32 px-3 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-600">{profile?.bio || 'No description provided'}</p>
                )}

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {profile?.role === 'worker' ? 'Work Experience' : 'Company Size'}
                  </h2>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.experience || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, experience: e.target.value })}
                      className="w-full px-3 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-600">{profile?.experience || 'Not specified'}</p>
                  )}
                </div>
              </div>

              {/* Skills & Languages Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.skills?.join(', ') || ''}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter skills separated by commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      )) || 'No skills listed'}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Languages</h2>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.languages?.join(', ') || ''}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        languages: e.target.value.split(',').map(l => l.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter languages separated by commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile?.languages?.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      )) || 'No languages listed'}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Availability</h2>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.availability || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, availability: e.target.value })}
                      className="w-full px-3 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-600">{profile?.availability || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 