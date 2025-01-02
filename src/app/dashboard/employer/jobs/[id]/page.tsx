'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { getJob, type Job } from '@/lib/actions'
import { use } from 'react'

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadJob()
  }, [resolvedParams.id])

  const loadJob = async () => {
    try {
      const jobData = await getJob(resolvedParams.id)
      setJob(jobData)
    } catch (error) {
      console.error('Error loading job:', error)
      toast.error('Failed to load job')
      router.push('/dashboard/employer/jobs')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!job) return null

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/dashboard/employer/jobs/${job.id}/edit`}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Edit Job
          </Link>
          <Link
            href="/dashboard/employer/jobs"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium
              ${job.status === 'published' ? 'bg-green-100 text-green-700' :
                job.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}
            >
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="mt-1 text-sm text-gray-900">{job.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Work Type</h3>
              <p className="mt-1 text-sm text-gray-900 capitalize">{job.work_type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
              <p className="mt-1 text-sm text-gray-900">
                {job.salary_range.min.toLocaleString()} - {job.salary_range.max.toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-900 whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requirements.required.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          {job.requirements.preferred.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Preferred Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.preferred.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 