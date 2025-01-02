'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { getJob, updateJob, type Job } from '@/lib/actions'
import { use } from 'react'
import SkillSelect from '@/components/jobs/SkillSelect'
import type { Skill } from '@/lib/constants'

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [requiredSkills, setRequiredSkills] = useState<Skill[]>([])
  const [preferredSkills, setPreferredSkills] = useState<Skill[]>([])

  useEffect(() => {
    loadJob()
  }, [resolvedParams.id])

  const loadJob = async () => {
    try {
      const jobData = await getJob(resolvedParams.id)
      setJob(jobData)
      setRequiredSkills(jobData.requirements.required as Skill[])
      setPreferredSkills(jobData.requirements.preferred as Skill[])
    } catch (error) {
      console.error('Error loading job:', error)
      toast.error('Failed to load job')
      router.push('/dashboard/employer/jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

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

      await updateJob(resolvedParams.id, jobData)
      toast.success('Job updated successfully!')
      router.push('/dashboard/employer/jobs')
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error('Failed to update job. Please try again.')
    } finally {
      setSaving(false)
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
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <Link
          href="/dashboard/employer/jobs"
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Cancel
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
            defaultValue={job.title}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
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
            defaultValue={job.description}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
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
              defaultValue={job.salary_range.min}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
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
              defaultValue={job.salary_range.max}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
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
            defaultValue={job.location}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
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
            defaultValue={job.work_type}
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
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
} 