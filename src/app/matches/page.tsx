'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProfile, getMatchedWorkers, getMatchedJobs, type MatchedWorker, type MatchedJob } from '@/lib/actions'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'

export default function MatchesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'worker' | 'employer' | null>(null)
  const [matchedWorkers, setMatchedWorkers] = useState<MatchedWorker[]>([])
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const profile = await getProfile()
        setUserRole(profile.role)

        if (profile.role === 'employer') {
          const workers = await getMatchedWorkers()
          setMatchedWorkers(workers)
        } else {
          const jobs = await getMatchedJobs()
          setMatchedJobs(jobs)
        }
      } catch (error) {
        console.error('Error loading matches:', error)
        toast.error('Please login to view matches')
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Go Dashboard
          </Link>
        </div>

        {userRole === 'employer' ? (
          // Employer view - Show matched workers
          <div className="space-y-6">
            {matchedWorkers.map(worker => (
              <div key={worker.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={worker.avatar_url || '/default-avatar.png'}
                        alt={worker.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{worker.name}</h2>
                      <p className="text-gray-600">{worker.experience}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Matched with: {worker.job.title} • {worker.job.location} • {worker.job.work_type}
                      </p>
                    </div>
                  </div>

                  {worker.bio && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-600">{worker.bio}</p>
                    </div>
                  )}

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {worker.languages.map(language => (
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
            ))}

            {matchedWorkers.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h2>
                <p className="text-gray-600">Start swiping to find great talent!</p>
              </div>
            )}
          </div>
        ) : (
          // Worker view - Show matched jobs
          <div className="space-y-6">
            {matchedJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={job.employer.avatar_url || '/default-company.png'}
                        alt={job.employer.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-gray-600">{job.employer.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {job.location} • {job.work_type}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Job Description</h3>
                    <p className="text-gray-600">{job.description}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Salary Range</h3>
                    <p className="text-gray-600">
                      ${job.salary_range.min.toLocaleString()} - ${job.salary_range.max.toLocaleString()} / year
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {matchedJobs.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h2>
                <p className="text-gray-600">Start swiping to find your dream job!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
} 