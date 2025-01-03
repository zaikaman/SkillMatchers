'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useProfile } from '@/components/providers/profile'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

const InterviewRoom = dynamic(
  () => import('@/components/interview/InterviewRoom'),
  {
    ssr: false,
    loading: () => <Loading />
  }
)

export default function InterviewPage() {
  return <InterviewRoom />
} 