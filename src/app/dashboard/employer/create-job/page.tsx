'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { createJob } from '@/lib/actions'
import SkillSelect from '@/components/jobs/SkillSelect'
import type { Skill } from '@/lib/constants'

export default function CreateJob() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [requiredSkills, setRequiredSkills] = useState<Skill[]>([])
  const [preferredSkills, setPreferredSkills] = useState<Skill[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const jobData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        requirements: {
          required: requiredSkills,
          preferred: preferredSkills
        },
        salary_range: {
          min: parseInt(formData.get('salary_min') as string),
          max: parseInt(formData.get('salary_max') as string),
        },
        location: formData.get('location') as string,
        work_type: formData.get('work_type') as 'remote' | 'hybrid' | 'onsite',
      }

      await createJob(jobData)
      toast.success('Job created successfully!')
      router.push('/dashboard/employer/jobs')
    } catch (error) {
      console.error('Error creating job:', error)
      toast.error('Failed to create job. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Job</h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Go Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description *
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={5}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
              placeholder="Describe the role, responsibilities, and ideal candidate..."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills *
              </label>
              <SkillSelect
                selectedSkills={requiredSkills}
                onChange={setRequiredSkills}
                placeholder="Select required skills..."
              />
              {requiredSkills.length === 0 && (
                <p className="mt-1 text-sm text-red-500">
                  Please select at least one required skill
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Skills
              </label>
              <SkillSelect
                selectedSkills={preferredSkills}
                onChange={setPreferredSkills}
                placeholder="Select preferred skills..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="salary_min" className="block text-sm font-medium text-gray-700">
                Minimum Salary *
              </label>
              <input
                type="number"
                name="salary_min"
                id="salary_min"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                placeholder="e.g. 50000"
              />
            </div>

            <div>
              <label htmlFor="salary_max" className="block text-sm font-medium text-gray-700">
                Maximum Salary *
              </label>
              <input
                type="number"
                name="salary_max"
                id="salary_max"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                placeholder="e.g. 80000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
              placeholder="e.g. Ho Chi Minh City, Vietnam"
            />
          </div>

          <div>
            <label htmlFor="work_type" className="block text-sm font-medium text-gray-700">
              Work Type *
            </label>
            <select
              name="work_type"
              id="work_type"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
            >
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard/employer/jobs"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading || requiredSkills.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
} 