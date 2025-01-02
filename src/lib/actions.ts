import { supabase } from './supabase'

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