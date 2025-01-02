export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'worker' | 'employer'
          name: string
          email: string
          avatar_url: string | null
          bio: string | null
          experience: string | null
          availability: string | null
          languages: string[] | null
          skills: string[] | null
          has_completed_onboarding: boolean
          cv_url: string | null
          linkedin_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'worker' | 'employer'
          name: string
          email: string
          avatar_url?: string | null
          bio?: string | null
          experience?: string | null
          availability?: string | null
          languages?: string[] | null
          skills?: string[] | null
          has_completed_onboarding?: boolean
          cv_url?: string | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'worker' | 'employer'
          name?: string
          email?: string
          avatar_url?: string | null
          bio?: string | null
          experience?: string | null
          availability?: string | null
          languages?: string[] | null
          skills?: string[] | null
          has_completed_onboarding?: boolean
          cv_url?: string | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
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
        Insert: {
          id?: string
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
          status?: 'draft' | 'published' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          title?: string
          description?: string
          requirements?: {
            required: string[]
            preferred: string[]
          }
          salary_range?: {
            min: number
            max: number
          }
          location?: string
          work_type?: 'remote' | 'hybrid' | 'onsite'
          status?: 'draft' | 'published' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          job_id: string
          worker_id: string
          employer_id: string
          employer_status: 'pending' | 'accepted' | 'rejected'
          worker_status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          worker_id: string
          employer_id: string
          employer_status?: 'pending' | 'accepted' | 'rejected'
          worker_status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          worker_id?: string
          employer_id?: string
          employer_status?: 'pending' | 'accepted' | 'rejected'
          worker_status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 