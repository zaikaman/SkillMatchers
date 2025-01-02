'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { updateProfile, uploadAvatar } from '@/lib/actions'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getProfile } from '@/lib/actions'
import toast from 'react-hot-toast'
import Loading from '@/components/Loading'

type Role = 'worker' | 'employer' | null
type Step = 1 | 2 | 3

export default function Onboarding() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [step, setStep] = useState<Step>(1)
  const [role, setRole] = useState<Role>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        await getProfile()
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Please login to access onboarding')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setTimeout(checkProfile, 1000)
          return
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
          return
        }

        if (profile?.has_completed_onboarding) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error in checkProfile:', error)
      }
    }

    checkProfile()
  }, [router, supabase])

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleSkillsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      const url = await uploadToCloudinary(file)
      setAvatarUrl(url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await updateProfile({
        role: role!,
        skills,
        languages,
        bio: formData.get('bio') as string,
        experience: formData.get('experience') as string,
        availability: formData.get('availability') as string,
        avatar_url: avatarUrl,
        has_completed_onboarding: true,
      })
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'gradient-bg text-white' : 'bg-gray-200'}`}>1</div>
              <div className={`w-24 h-1 ${step >= 2 ? 'gradient-bg' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'gradient-bg text-white' : 'bg-gray-200'}`}>2</div>
              <div className={`w-24 h-1 ${step >= 3 ? 'gradient-bg' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'gradient-bg text-white' : 'bg-gray-200'}`}>3</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {step === 1 && (
              <div className="text-center">
                <h1 className="heading-lg gradient-text mb-4">Choose Your Role</h1>
                <p className="body-base text-gray-600 mb-8">
                  Are you looking for talent or opportunities?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <button
                    onClick={() => handleRoleSelect('worker')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      role === 'worker'
                        ? 'border-[--primary-color] bg-pink-50'
                        : 'border-gray-200 hover:border-[--primary-color] hover:bg-pink-50'
                    }`}
                  >
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">👨‍💼</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Job Seeker</h3>
                    <p className="text-gray-600 text-sm">
                      I want to find new job opportunities
                    </p>
                  </button>

                  <button
                    onClick={() => handleRoleSelect('employer')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      role === 'employer'
                        ? 'border-[--primary-color] bg-pink-50'
                        : 'border-gray-200 hover:border-[--primary-color] hover:bg-pink-50'
                    }`}
                  >
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">👨</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Employer</h3>
                    <p className="text-gray-600 text-sm">
                      I want to find talented candidates
                    </p>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="heading-lg gradient-text mb-4 text-center">
                  {role === 'worker' ? 'Your Skills' : 'Required Skills'}
                </h1>
                <p className="body-base text-gray-600 mb-8 text-center">
                  {role === 'worker'
                    ? 'Select skills you have'
                    : 'Select skills you are looking for'}
                </p>

                <form onSubmit={handleSkillsSubmit} className="max-w-2xl mx-auto">
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'Python', 'React', 'Node.js', 'UI/UX Design', 'Digital Marketing', 
                        'Data Analysis', 'Machine Learning', 'Product Management', 'Business Strategy'].map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (skills.includes(skill)) {
                              setSkills(skills.filter(s => s !== skill))
                            } else {
                              setSkills([...skills, skill])
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            skills.includes(skill)
                              ? 'gradient-bg text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={skills.length === 0}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    Continue
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="heading-lg gradient-text mb-4 text-center">Complete Your Profile</h1>
                <p className="body-base text-gray-600 mb-8 text-center">
                  {role === 'worker' 
                    ? 'Add information to increase your chances of getting hired'
                    : 'Add information about your company'}
                </p>

                <form onSubmit={handleProfileSubmit} className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {role === 'worker' ? 'Profile Picture' : 'Company Logo'}
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={role === 'worker' ? 'Profile Picture' : 'Company Logo'}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl">{role === 'worker' ? '👤' : '🏢'}</span>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-secondary"
                        disabled={loading}
                      >
                        {loading ? 'Uploading...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      {role === 'worker' ? 'About You' : 'About Company'}
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                      placeholder={role === 'worker' 
                        ? "Share your experience and career goals..."
                        : "Share about your company and work culture..."}
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      {role === 'worker' ? 'Work Experience' : 'Company Size'}
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    >
                      {role === 'worker' ? (
                        <>
                          <option value="">Select years of experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </>
                      ) : (
                        <>
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501+">500+ employees</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                      {role === 'worker' ? 'Available to Start' : 'Hiring Timeline'}
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[--primary-color] focus:border-transparent transition-all"
                    >
                      <option value="">Select availability</option>
                      <option value="immediately">Immediately</option>
                      <option value="2-weeks">In 2 weeks</option>
                      <option value="1-month">In 1 month</option>
                      <option value="negotiable">Negotiable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Working Languages
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Vietnamese', 'English', 'Japanese', 'Korean', 'Chinese'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            if (languages.includes(lang)) {
                              setLanguages(languages.filter(l => l !== lang))
                            } else {
                              setLanguages([...languages, lang])
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            languages.includes(lang)
                              ? 'gradient-bg text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || languages.length === 0}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Complete'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 