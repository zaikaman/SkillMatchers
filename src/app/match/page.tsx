'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { getJob, type Job } from '@/lib/actions'
import Loading from '@/components/Loading'

interface Candidate {
  id: string
  name: string
  avatar_url: string
  bio: string
  experience: string
  skills: string[]
  languages: string[]
  linkedin_url?: string
}

const DUMMY_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar_url: 'https://i.pravatar.cc/300?img=1',
    bio: 'Full-stack developer with 5 years of experience in React and Node.js',
    experience: '5-10',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    languages: ['English', 'Vietnamese'],
    linkedin_url: 'https://linkedin.com/in/johndoe'
  },
  // Add more dummy candidates here
]

export default function MatchPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    if (!jobId) return

    const loadJob = async () => {
      try {
        const jobData = await getJob(jobId)
        setJob(jobData)
      } catch (error) {
        console.error('Error loading job:', error)
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [jobId])

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction)
    setTimeout(() => {
      setSwipeDirection(null)
      setCurrentIndex((prev) => prev + 1)
    }, 300)
  }

  if (loading) return <Loading />
  if (!job) return <div>Job not found</div>
  if (currentIndex >= DUMMY_CANDIDATES.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No More Candidates</h2>
          <p className="text-gray-600 mb-8">We'll notify you when new candidates match your job requirements.</p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="btn-primary"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  const candidate = DUMMY_CANDIDATES[currentIndex]

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Job Info */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="font-semibold">Matching for: {job.title}</h2>
            <p className="text-sm text-gray-600">{job.location} • {job.work_type}</p>
          </div>

          {/* Candidate Card */}
          <div
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 ${
              swipeDirection === 'left' ? '-translate-x-full' : 
              swipeDirection === 'right' ? 'translate-x-full' : ''
            }`}
          >
            {/* Candidate Image */}
            <div className="relative h-96">
              <Image
                src={candidate.avatar_url}
                alt={candidate.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Candidate Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{candidate.name}</h2>
                  <p className="text-gray-600">{candidate.experience} years experience</p>
                </div>
                {candidate.linkedin_url && (
                  <a
                    href={candidate.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-gray-700 mb-6">{candidate.bio}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                      >
                        {skill}
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