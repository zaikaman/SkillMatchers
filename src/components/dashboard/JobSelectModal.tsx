import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Job } from '@/lib/actions'

interface JobSelectModalProps {
  isOpen: boolean
  onClose: () => void
  jobs: Job[]
}

export default function JobSelectModal({ isOpen, onClose, jobs }: JobSelectModalProps) {
  const router = useRouter()
  const [selectedJobId, setSelectedJobId] = useState<string>('')

  if (!isOpen) return null

  const handleStartMatching = () => {
    if (selectedJobId) {
      router.push(`/match?jobId=${selectedJobId}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Select a Job to Start Matching</h2>
        <p className="text-gray-600 mb-6">
          Choose one of your active jobs to start matching with potential candidates.
          You can only match for one job at a time.
        </p>

        <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto">
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any active jobs yet.</p>
              <button
                onClick={() => router.push('/dashboard/employer/create-job')}
                className="btn-primary"
              >
                Create Your First Job
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedJobId === job.id
                    ? 'border-[--primary-color] bg-pink-50'
                    : 'border-gray-200 hover:border-[--primary-color] hover:bg-pink-50'
                }`}
              >
                <h3 className="font-semibold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {job.requirements.required.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requirements.required.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      +{job.requirements.required.length - 3} more
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {job.location} • {job.work_type}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleStartMatching}
            disabled={!selectedJobId}
            className="btn-primary disabled:opacity-50"
          >
            Start Matching
          </button>
        </div>
      </div>
    </div>
  )
} 