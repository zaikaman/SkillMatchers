'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { getJob, getPotentialMatches, getPotentialJobMatches, createMatch, type Job } from '@/lib/actions'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useProfile } from '@/components/providers/profile'
import MatchAlert from '@/components/match/MatchAlert'

interface Candidate {
  id: string
  name: string
  avatar_url: string
  bio: string
  experience: string
  skills: string[]
  languages: string[]
  linkedin_url?: string
  cv_url?: string
}

interface JobMatch {
  id: string
  title: string
  description: string
  requirements: {
    required: string[]
    preferred: string[]
  }
  salary_range: {
    min: number
    max: number
  }
  location: string
  work_type: 'remote' | 'hybrid' | 'onsite'
  employer: {
    id: string
    name: string
    avatar_url: string
  }
}

function MatchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const { profile } = useProfile()
  const [job, setJob] = useState<Job | null>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [jobs, setJobs] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [showMatchAlert, setShowMatchAlert] = useState(false)
  const [matchedEmployer, setMatchedEmployer] = useState<{ name: string; avatar: string } | null>(null)
  const [matchedWorker, setMatchedWorker] = useState<{ name: string; avatar: string } | null>(null)
  const [pendingNextProfile, setPendingNextProfile] = useState(false)

  useEffect(() => {
    if (!profile) return

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (profile.role === 'employer') {
          if (!jobId) {
            setError('Job ID not found. Please select a job to start matching.')
            return
          }

          const [jobData, candidatesData] = await Promise.all([
            getJob(jobId),
            getPotentialMatches(jobId)
          ])

          if (!jobData) {
            setError('Job not found. The job may have been deleted or you do not have permission to access it.')
            return
          }

          setJob(jobData)
          setCandidates(candidatesData)
        } else {
          // Worker flow
          const matchingJobs = await getPotentialJobMatches()
          setJobs(matchingJobs)
        }
      } catch (error) {
        console.error('Error loading data:', error)
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while loading matching data'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [jobId, profile])

  const handleMatch = (result: any, matchData: { employer: { name: string; avatar: string }; worker: { name: string; avatar: string } }) => {
    if (result.employer_status === 'accepted' && result.worker_status === 'accepted') {
      setMatchedEmployer(matchData.employer)
      setMatchedWorker(matchData.worker)
      setPendingNextProfile(true)
      setShowMatchAlert(true)
    } else {
      // If no match, move to next profile immediately
      setSwipeDirection(null)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!profile) return

    setSwipeDirection(direction)

    if (direction === 'right') {
      try {
        let matchResult;
        
        if (profile.role === 'employer' && job && candidates[currentIndex]) {
          matchResult = await createMatch(
            job.id,
            candidates[currentIndex].id,
            job.employer_id,
            'accepted'
          )
          
          handleMatch(matchResult, {
            employer: {
              name: profile.full_name || 'Employer',
              avatar: profile.avatar_url || ''
            },
            worker: {
              name: candidates[currentIndex].name,
              avatar: candidates[currentIndex].avatar_url
            }
          })
        } else if (profile.role === 'worker' && jobs[currentIndex]) {
          matchResult = await createMatch(
            jobs[currentIndex].id,
            profile.id,
            jobs[currentIndex].employer.id,
            'accepted'
          )
          
          handleMatch(matchResult, {
            worker: {
              name: profile.full_name || 'Worker',
              avatar: profile.avatar_url || ''
            },
            employer: {
              name: jobs[currentIndex].employer.name,
              avatar: jobs[currentIndex].employer.avatar_url
            }
          })
        }
      } catch (error) {
        console.error('Error creating match:', error)
        toast.error('Could not save match result. Please try again.')
        setSwipeDirection(null)
      }
    } else {
      // For left swipe, update immediately
      setTimeout(() => {
        setSwipeDirection(null)
        setCurrentIndex((prev) => prev + 1)
      }, 300)
    }
  }

  const handleCloseMatchAlert = () => {
    setShowMatchAlert(false)
    setMatchedEmployer(null)
    setMatchedWorker(null)
    
    // Only move to next profile after closing the match alert
    if (pendingNextProfile) {
      setPendingNextProfile(false)
      setSwipeDirection(null)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  if (loading) return <Loading />

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">An error occurred</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <div className="space-y-4">
              <Link
                href={profile?.role === 'employer' ? '/dashboard/employer/jobs' : '/dashboard'}
                className="block w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Back to dashboard
              </Link>
              <button
                onClick={() => router.refresh()}
                className="block w-full px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-md hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (profile?.role === 'employer') {
    if (!job) return <div>Job not found</div>

    if (currentIndex >= candidates.length) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No more suitable candidates</h2>
            <p className="text-gray-600 mb-8">
              We will notify you when new candidates match your requirements.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="block w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Refresh
              </button>
              <Link
                href="/dashboard"
                className="block w-full px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-md hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      )
    }

    const candidate = candidates[currentIndex]

    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Job Info */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <h2 className="font-semibold">Finding candidates for: {job.title}</h2>
              <p className="text-sm text-gray-600">{job.location} • {job.work_type}</p>
            </div>

            {/* Candidate Card */}
            <div
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 ${
                swipeDirection === 'left' ? '-translate-x-full' : 
                swipeDirection === 'right' ? 'translate-x-full' : ''
              }`}
            >
              <div className="p-6">
                {/* Header with small avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={candidate.avatar_url || '/default-avatar.png'}
                      alt={candidate.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">{candidate.name}</h2>
                        <p className="text-gray-600">{candidate.experience} years of experience</p>
                      </div>
                      <div className="flex gap-2">
                        {candidate.linkedin_url && (
                          <a
                            href={candidate.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                            title="View LinkedIn Profile"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {candidate.cv_url && (
                          <a
                            href={candidate.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-50 rounded-full transition-colors"
                            title="View CV"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{candidate.bio}</p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-full text-sm ${
                            job.requirements.required.includes(skill)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-pink-100 text-pink-800'
                          }`}
                        >
                          {skill}
                          {job.requirements.required.includes(skill) && (
                            <span className="ml-1">✓</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.languages.map((language) => (
                        <span
                          key={language}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 p-6 bg-gray-50">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  <span className="text-2xl">✕</span>
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                >
                  <span className="text-2xl">✓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Worker view
  if (currentIndex >= jobs.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No more jobs available</h2>
          <p className="text-gray-600 mb-8">
            We will notify you when new jobs match your skills.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="block w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Refresh
            </button>
            <Link
              href="/dashboard"
              className="block w-full px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-md hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentJob = jobs[currentIndex]

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Job Card */}
            <div
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 ${
                swipeDirection === 'left' ? '-translate-x-full' : 
                swipeDirection === 'right' ? 'translate-x-full' : ''
              }`}
            >
              {/* Company Info */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={currentJob.employer.avatar_url || '/default-company.png'}
                      alt={currentJob.employer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{currentJob.employer.name}</h2>
                    <p className="text-gray-600">{currentJob.location} • {currentJob.work_type}</p>
                  </div>
                </div>
              </div>

              {/* Job Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{currentJob.title}</h3>
                <p className="text-gray-700 mb-6">{currentJob.description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentJob.requirements.required.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {currentJob.requirements.preferred.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Preferred Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentJob.requirements.preferred.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Salary Range</h4>
                    <p className="text-gray-700">
                      ${currentJob.salary_range.min.toLocaleString()} - ${currentJob.salary_range.max.toLocaleString()} / year
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 p-6 bg-gray-50">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  <span className="text-2xl">✕</span>
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                >
                  <span className="text-2xl">✓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MatchAlert
        isVisible={showMatchAlert}
        onClose={handleCloseMatchAlert}
        employerName={matchedEmployer?.name || ''}
        employerAvatar={matchedEmployer?.avatar || ''}
        workerName={matchedWorker?.name || ''}
        workerAvatar={matchedWorker?.avatar || ''}
      />
    </>
  )
}

export default function MatchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MatchContent />
    </Suspense>
  )
} 