'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createJob } from '@/lib/actions'

export default function CreateJob() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  const [preferredSkills, setPreferredSkills] = useState<string[]>([])
  const [newRequiredSkill, setNewRequiredSkill] = useState('')
  const [newPreferredSkill, setNewPreferredSkill] = useState('')

  const handleAddRequiredSkill = () => {
    if (newRequiredSkill.trim()) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()])
      setNewRequiredSkill('')
    }
  }

  const handleAddPreferredSkill = () => {
    if (newPreferredSkill.trim()) {
      setPreferredSkills([...preferredSkills, newPreferredSkill.trim()])
      setNewPreferredSkill('')
    }
  }

  const handleRemoveRequiredSkill = (index: number) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index))
  }

  const handleRemovePreferredSkill = (index: number) => {
    setPreferredSkills(preferredSkills.filter((_, i) => i !== index))
  }

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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Job</h1>

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
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newRequiredSkill}
                onChange={(e) => setNewRequiredSkill(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                placeholder="e.g. React"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddRequiredSkill()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddRequiredSkill}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequiredSkill(index)}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Skills
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPreferredSkill}
                onChange={(e) => setNewPreferredSkill(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                placeholder="e.g. Next.js"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddPreferredSkill()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddPreferredSkill}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemovePreferredSkill(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  )
} 