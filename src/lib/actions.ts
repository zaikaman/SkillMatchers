import { supabase } from './supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const authCallbackUrl = process.env.NEXT_PUBLIC_SITE_AUTH_CALLBACK || `${siteUrl}/auth/callback`

export type Profile = {
  id: string
  role: 'worker' | 'employer'
  full_name: string
  avatar_url?: string
  bio?: string
  experience?: string
  availability?: string
  languages?: string[]
  skills?: string[]
  has_completed_onboarding: boolean
  cv_url?: string
  cv_download_url?: string
  linkedin_url?: string
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: authCallbackUrl,
    },
  })
  
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: authCallbackUrl
      }
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error signing in with Google:', error)
    return { data: null, error }
  }
}

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data as Profile
}

export async function updateProfile(profile: Partial<Profile>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) throw error
}

export async function uploadAvatar(file: File) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/avatar.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  await updateProfile({ avatar_url: publicUrl })
  return publicUrl
}

interface CreateJobData {
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
}

export async function createJob(jobData: CreateJobData) {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  // Get user profile to verify employer role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError) throw profileError
  if (!profile || profile.role !== 'employer') {
    throw new Error('Only employers can create jobs')
  }

  // Create job
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      employer_id: user.id,
      title: jobData.title,
      description: jobData.description,
      requirements: jobData.requirements,
      salary_range: jobData.salary_range,
      location: jobData.location,
      work_type: jobData.work_type,
      status: 'published'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export interface Job {
  id: string
  employer_id: string
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
  status: 'draft' | 'published' | 'closed'
  created_at: string
  updated_at: string
}

export async function getEmployerJobs() {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError) throw profileError
  if (!profile || profile.role !== 'employer') {
    throw new Error('Only employers can access jobs')
  }

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('employer_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return jobs as Job[]
}

export async function updateJobStatus(jobId: string, status: 'draft' | 'published' | 'closed') {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('jobs')
    .update({ status })
    .eq('id', jobId)
    .eq('employer_id', user.id)

  if (error) throw error
}

export async function deleteJob(jobId: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId)
    .eq('employer_id', user.id)

  if (error) throw error
}

export async function getJob(jobId: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single()

  if (error) throw error
  return data as Job
}

export async function updateJob(jobId: string, jobData: CreateJobData) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('jobs')
    .update({
      title: jobData.title,
      description: jobData.description,
      requirements: jobData.requirements,
      salary_range: jobData.salary_range,
      location: jobData.location,
      work_type: jobData.work_type,
      updated_at: new Date().toISOString()
    })
    .eq('id', jobId)
    .eq('employer_id', user.id)

  if (error) throw error
}

export async function getPotentialMatches(jobId: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('Auth error:', {
      message: userError.message,
      details: userError
    })
    throw new Error(`Authentication error: ${userError.message}`)
  }
  if (!user) throw new Error('Please login to use this feature')

  try {
    // Get job details first
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (jobError) {
      console.error('Job query error:', {
        message: jobError.message,
        details: jobError
      })
      throw new Error(`Could not get job details: ${jobError.message}`)
    }
    if (!job) throw new Error('Job not found')

    console.log('Job found:', {
      id: job.id,
      title: job.title,
      required_skills: job.requirements.required
    })

    // Verify employer owns this job
    if (job.employer_id !== user.id) {
      throw new Error('You do not have permission to view matches for this job')
    }

    // Get existing matches
    const { data: existingMatches, error: matchesError } = await supabase
      .from('matches')
      .select('worker_id')
      .eq('job_id', jobId)

    if (matchesError) {
      console.error('Matches query error:', {
        message: matchesError.message,
        details: matchesError
      })
      throw new Error(`Error getting matches list: ${matchesError.message}`)
    }

    const excludedWorkerIds = existingMatches?.map(m => m.worker_id) || []
    console.log('Excluded worker IDs:', excludedWorkerIds)

    // Get all workers first
    const { data: workers, error: workersError } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        avatar_url,
        bio,
        experience,
        skills,
        languages,
        linkedin_url,
        cv_url
      `)
      .eq('role', 'worker')

    if (workersError) {
      console.error('Workers query error:', {
        message: workersError.message,
        code: workersError.code,
        details: workersError
      })
      throw new Error(`Error finding candidates: ${workersError.message || 'Could not connect to database'}`)
    }

    console.log('All workers found:', workers?.length || 0)

    if (!workers) return []

    // Filter workers manually
    const availableWorkers = workers.filter(worker => 
      !excludedWorkerIds.includes(worker.id)
    )

    console.log('Available workers (not matched):', availableWorkers.length)

    // Filter workers by skills
    const matchingWorkers = availableWorkers.filter(worker => {
      // Make sure worker has skills array
      if (!worker.skills || !Array.isArray(worker.skills)) {
        console.log(`Worker ${worker.full_name || worker.id} has invalid skills:`, worker.skills)
        return false
      }

      // Check if worker has all required skills
      const hasAllRequiredSkills = job.requirements.required.every(
        (skill: string) => worker.skills!.includes(skill)
      )
      console.log(`Worker ${worker.full_name || worker.id} matching result:`, {
        has_all_skills: hasAllRequiredSkills,
        worker_skills: worker.skills,
        required_skills: job.requirements.required
      })
      return hasAllRequiredSkills
    })

    console.log('Final matching workers:', {
      total: matchingWorkers.length,
      workers: matchingWorkers.map(w => ({
        id: w.id,
        full_name: w.full_name,
        skills: w.skills
      }))
    })

    // Map workers to Candidate interface
    const candidates = matchingWorkers.map(worker => ({
      id: worker.id,
      name: worker.full_name,
      avatar_url: worker.avatar_url || '',
      bio: worker.bio || '',
      experience: worker.experience || '',
      skills: worker.skills || [],
      languages: worker.languages || [],
      linkedin_url: worker.linkedin_url,
      cv_url: worker.cv_url
    }))

    return candidates
  } catch (error) {
    console.error('Error in getPotentialMatches:', {
      error,
      jobId,
      userId: user.id
    })
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An error occurred while finding matching candidates')
  }
}

export async function createMatch(jobId: string, workerId: string, employerId: string, status: 'accepted' | 'rejected') {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Please login to perform this action')

    // Get user profile to verify role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError
    if (!profile) throw new Error('Profile not found')

    // Check if match already exists
    const { data: existingMatch, error: matchCheckError } = await supabase
      .from('matches')
      .select('*')
      .eq('job_id', jobId)
      .eq('worker_id', workerId)
      .single()

    if (matchCheckError && matchCheckError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('[createMatch] Failed to check existing match:', JSON.stringify({
        message: matchCheckError.message,
        code: matchCheckError.code,
        details: matchCheckError
      }, null, 2))
      throw new Error(`Could not check existing match: ${matchCheckError.message}`)
    }

    // Create match data based on user role
    let matchData
    if (profile.role === 'worker') {
      if (user.id !== workerId) throw new Error('You do not have permission to perform this action')
      matchData = {
        job_id: jobId,
        worker_id: workerId,
        employer_id: employerId,
        employer_status: 'pending',
        worker_status: status
      }
    } else if (profile.role === 'employer') {
      if (user.id !== employerId) throw new Error('You do not have permission to perform this action')
      matchData = {
        job_id: jobId,
        worker_id: workerId,
        employer_id: employerId,
        employer_status: status,
        worker_status: 'pending'
      }
    } else {
      throw new Error('Invalid user role')
    }

    let data
    let error

    // If match exists, update it
    if (existingMatch) {
      console.log('[createMatch] Updating existing match:', JSON.stringify({
        id: existingMatch.id,
        current_status: {
          employer: existingMatch.employer_status,
          worker: existingMatch.worker_status
        },
        new_status: profile.role === 'worker' ? {
          worker: status
        } : {
          employer: status
        }
      }, null, 2))

      // Only update the status for the current user's role
      const updateData = profile.role === 'worker' ? 
        { worker_status: status } : 
        { employer_status: status }

      const result = await supabase
        .from('matches')
        .update(updateData)
        .eq('id', existingMatch.id)
        .select()
        .single()

      data = result.data
      error = result.error
    } else {
      // Create new match
      console.log('[createMatch] Creating new match:', JSON.stringify(matchData, null, 2))
      
      const result = await supabase
        .from('matches')
        .insert(matchData)
        .select()
        .single()

      data = result.data
      error = result.error
    }

    if (error) {
      console.error('[createMatch] Failed to save match:', JSON.stringify({
        message: error.message,
        code: error.code,
        details: error,
        matchData,
        isUpdate: Boolean(existingMatch)
      }, null, 2))
      throw new Error(`Could not save match: ${error.message}`)
    }

    console.log('[createMatch] Match saved successfully:', JSON.stringify({
      id: data.id,
      job_id: data.job_id,
      worker_id: data.worker_id,
      employer_id: data.employer_id,
      employer_status: data.employer_status,
      worker_status: data.worker_status,
      isUpdate: Boolean(existingMatch)
    }, null, 2))

    return data
  } catch (error) {
    console.error('[createMatch] Error:', JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error',
      jobId,
      workerId,
      employerId,
      status
    }, null, 2))
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An error occurred while saving match')
  }
}

interface JobWithProfile {
  id: string
  employer_id: string
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
  profiles: {
    full_name: string
    avatar_url: string | null
  }
}

export async function getPotentialJobMatches() {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('[getPotentialJobMatches] Authentication error:', {
      message: userError.message,
      details: userError
    })
    throw new Error(`Authentication error: ${userError.message}`)
  }
  if (!user) throw new Error('Please login to use this feature')

  try {
    // Get worker profile first
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('[getPotentialJobMatches] Failed to get worker profile:', {
        message: profileError.message,
        details: profileError,
        userId: user.id
      })
      throw new Error(`Could not get profile details: ${profileError.message}`)
    }
    if (!profile) {
      console.error('[getPotentialJobMatches] Profile not found:', { userId: user.id })
      throw new Error('Profile not found')
    }
    if (profile.role !== 'worker') {
      console.error('[getPotentialJobMatches] Invalid role:', JSON.stringify({ 
        userId: user.id,
        role: profile.role 
      }, null, 2))
      throw new Error('Only workers can use this feature')
    }

    console.error('[getPotentialJobMatches] Worker profile:', JSON.stringify({
      id: profile.id,
      skills: profile.skills || [],
      role: profile.role,
      hasSkills: Boolean(profile.skills),
      isSkillsArray: Array.isArray(profile.skills),
      fullProfile: profile
    }, null, 2))

    // Get existing matches
    const { data: existingMatches, error: matchesError } = await supabase
      .from('matches')
      .select('job_id, employer_status, worker_status')
      .eq('worker_id', user.id)

    if (matchesError) {
      console.error('[getPotentialJobMatches] Failed to get existing matches:', JSON.stringify({
        message: matchesError.message,
        details: matchesError,
        userId: user.id
      }, null, 2))
      throw new Error(`Error getting matches list: ${matchesError.message}`)
    }

    // Only exclude jobs that have been accepted or rejected by both parties
    const excludedJobIds = existingMatches?.filter(match => 
      (match.employer_status === 'accepted' && match.worker_status === 'accepted') ||
      match.employer_status === 'rejected' ||
      match.worker_status === 'rejected'
    ).map(m => m.job_id) || []

    console.error('[getPotentialJobMatches] Existing matches:', JSON.stringify({
      total: existingMatches?.length || 0,
      matches: existingMatches || [],
      excludedJobIds,
      hasMatches: existingMatches && existingMatches.length > 0,
      pendingMatches: existingMatches?.filter(m => m.worker_status === 'pending').length || 0
    }, null, 2))

    // Get all published jobs that haven't been matched yet
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select(`
        id,
        employer_id,
        title,
        description,
        requirements,
        salary_range,
        location,
        work_type,
        employer:profiles!employer_id (
          full_name,
          avatar_url
        )
      `)
      .eq('status', 'published') as { data: (Omit<JobWithProfile, 'profiles'> & { employer: JobWithProfile['profiles'] })[] | null, error: any }

    if (jobsError) {
      console.error('[getPotentialJobMatches] Failed to get jobs:', JSON.stringify({
        message: jobsError.message,
        code: jobsError.code,
        details: jobsError,
        userId: user.id
      }, null, 2))
      throw new Error(`Error finding jobs: ${jobsError.message || 'Could not connect to database'}`)
    }

    console.error('[getPotentialJobMatches] Jobs query result:', JSON.stringify({
      total: jobs?.length || 0,
      hasJobs: Boolean(jobs),
      jobs: jobs?.map(j => ({
        id: j.id,
        title: j.title,
        employer: j.employer,
        requirements: j.requirements
      })) || []
    }, null, 2))

    if (!jobs || jobs.length === 0) {
      console.error('[getPotentialJobMatches] No published jobs found')
      return []
    }

    // If there are excluded jobs, filter them out manually
    let availableJobs = jobs
    if (excludedJobIds.length > 0) {
      availableJobs = availableJobs.filter(job => !excludedJobIds.includes(job.id))
      console.error('[getPotentialJobMatches] Jobs after excluding matches:', {
        before: jobs.length,
        after: availableJobs.length,
        excluded: jobs.length - availableJobs.length,
        jobs: availableJobs.map(j => ({
          id: j.id,
          title: j.title,
          employer: j.employer
        }))
      })
    }

    if (!availableJobs.length) {
      console.error('[getPotentialJobMatches] No available jobs after filtering')
      return []
    }

    // Filter jobs by worker skills
    const matchingJobs = availableJobs.filter(job => {
      // Make sure worker has skills array
      if (!profile.skills || !Array.isArray(profile.skills)) {
        console.error('[getPotentialJobMatches] Invalid worker skills:', {
          workerId: profile.id,
          skills: profile.skills,
          type: typeof profile.skills
        })
        return false
      }

      // Check if worker has all required skills for the job
      const hasAllRequiredSkills = job.requirements.required.every(
        (skill: string) => profile.skills!.includes(skill)
      )

      console.error(`[getPotentialJobMatches] Job "${job.title}" skill matching:`, {
        jobId: job.id,
        hasAllRequiredSkills,
        workerSkills: profile.skills,
        requiredSkills: job.requirements.required,
        matchedSkills: job.requirements.required.filter(skill => profile.skills!.includes(skill))
      })

      return hasAllRequiredSkills
    })

    console.error('[getPotentialJobMatches] Final matching jobs:', {
      total: matchingJobs.length,
      jobs: matchingJobs.map(j => ({
        id: j.id,
        title: j.title,
        required_skills: j.requirements.required,
        employer: {
          id: j.employer_id,
          name: j.employer.full_name
        }
      }))
    })

    return matchingJobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      salary_range: job.salary_range,
      location: job.location,
      work_type: job.work_type,
      employer: {
        id: job.employer_id,
        name: job.employer.full_name,
        avatar_url: job.employer.avatar_url || ''
      }
    }))
  } catch (error) {
    console.error('[getPotentialJobMatches] Unexpected error:', {
      error,
      userId: user.id,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    })
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An error occurred while finding matching jobs')
  }
} 