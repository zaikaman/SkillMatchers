'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProfile, getMatchedWorkers, getMatchedJobs, type MatchedWorker, type MatchedJob, getOrCreateConversation } from '@/lib/actions'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'

export default function MatchesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'worker' | 'employer' | null>(null)
  const [matchedWorkers, setMatchedWorkers] = useState<MatchedWorker[]>([])
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([])
  const [searchTerm, setSearchTerm] = useState('')

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

  const handleMessageClick = async (userId: string) => {
    try {
      const conversationId = await getOrCreateConversation(userId)
      router.push(`/messages?conversation=${conversationId}`)
    } catch (error) {
      console.error('Error starting conversation:', error)
      toast.error('Could not start conversation')
    }
  }

  const filteredWorkers = matchedWorkers.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    worker.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredJobs = matchedJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.employer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Matches</h1>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Go Dashboard
            </Link>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={userRole === 'employer' ? "Search by name, skills, or languages..." : "Search by job title, description, or company..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {userRole === 'employer' ? (
          // Employer view - Show matched workers in grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map(worker => (
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
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold truncate">{worker.name}</h2>
                      <p className="text-sm text-gray-600">{worker.experience} years experience</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Matched with: {worker.job.title}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Bio</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{worker.bio}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {worker.languages.map(language => (
                        <span
                          key={language}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
                    <p className="text-gray-600 text-sm">{worker.availability}</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {worker.cv_url && (
                      <a
                        href={worker.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        View CV
                      </a>
                    )}
                    {worker.linkedin_url && (
                      <a
                        href={worker.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="h-4 w-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleMessageClick(worker.id)}
                    className="mt-4 w-full bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition-colors"
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}

            {filteredWorkers.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h2>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          // Worker view - Show matched jobs in grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
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
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold truncate">{job.title}</h2>
                      <p className="text-sm text-gray-600 truncate">{job.employer.name}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {job.work_type}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 text-sm">{job.description}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Salary Range</h3>
                    <p className="text-gray-900 font-medium">
                      ${job.salary_range.min.toLocaleString()} - ${job.salary_range.max.toLocaleString()} / year
                    </p>
                  </div>

                  <button
                    onClick={() => handleMessageClick(job.employer.id)}
                    className="mt-4 w-full bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition-colors"
                  >
                    Message Employer
                  </button>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h2>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
} 