'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useProfile } from '@/components/providers/profile'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'
import AgoraRTC from 'agora-rtc-sdk-ng'
import {
  createAgoraClient,
  createLocalTracks,
  joinChannel,
  leaveChannel,
  type IAgoraRTCClient,
  type IAgoraRTCRemoteUser,
  type LocalTracks
} from '@/lib/agora'

function InterviewContent() {
  const searchParams = useSearchParams()
  const { profile } = useProfile()
  const [loading, setLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient | null>(null)
  const [localTracks, setLocalTracks] = useState<LocalTracks | null>(null)
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([])
  const localVideoRef = useRef<HTMLDivElement>(null)
  const remoteVideoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const initializeAgora = async () => {
      try {
        const client = createAgoraClient()
        setAgoraClient(client)

        // Handle user published events
        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType)
          if (mediaType === 'video') {
            setRemoteUsers(prev => [...prev, user])
          }
          if (mediaType === 'audio') {
            user.audioTrack?.play()
          }
        })

        // Handle user unpublished events
        client.on('user-unpublished', (user, mediaType) => {
          if (mediaType === 'video') {
            setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid))
          }
        })

        // Handle user left events
        client.on('user-left', (user) => {
          setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid))
        })

        const channelName = searchParams.get('channel') || 'default'
        await joinChannel(client, channelName, null, profile?.id || 'user')

        const tracks = await createLocalTracks()
        setLocalTracks(tracks)

        if (localVideoRef.current) {
          tracks.videoTrack.play(localVideoRef.current)
        }

        await client.publish([tracks.audioTrack, tracks.videoTrack])
        setLoading(false)
      } catch (error) {
        console.error('Error initializing Agora:', error)
        toast.error('Could not initialize video call')
        setLoading(false)
      }
    }

    if (profile) {
      initializeAgora()
    }

    return () => {
      if (agoraClient && localTracks) {
        localTracks.audioTrack.close()
        localTracks.videoTrack.close()
        leaveChannel(agoraClient)
      }
    }
  }, [profile, searchParams])

  useEffect(() => {
    // Play remote users' video tracks when refs are available
    remoteUsers.forEach(user => {
      const container = remoteVideoRefs.current[user.uid]
      if (container && user.videoTrack) {
        user.videoTrack.play(container)
      }
    })
  }, [remoteUsers])

  const toggleMute = () => {
    if (localTracks) {
      localTracks.audioTrack.setEnabled(!isMuted)
      setIsMuted(!isMuted)
    }
  }

  const toggleVideo = () => {
    if (localTracks) {
      localTracks.videoTrack.setEnabled(!isVideoOff)
      setIsVideoOff(!isVideoOff)
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!agoraClient || !localTracks) return

      if (!isScreenSharing) {
        const screenTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: '1080p_1',
          optimizationMode: 'detail'
        })
        await agoraClient.unpublish(localTracks.videoTrack)
        await agoraClient.publish(Array.isArray(screenTrack) ? screenTrack[0] : screenTrack)
        if (localVideoRef.current) {
          const videoTrack = Array.isArray(screenTrack) ? screenTrack[0] : screenTrack
          videoTrack.play(localVideoRef.current)
        }
        setIsScreenSharing(true)
      } else {
        // Switch back to camera
        await agoraClient.unpublish()
        await agoraClient.publish([localTracks.audioTrack, localTracks.videoTrack])
        if (localVideoRef.current) {
          localTracks.videoTrack.play(localVideoRef.current)
        }
        setIsScreenSharing(false)
      }
    } catch (error) {
      console.error('Error toggling screen share:', error)
      toast.error('Could not share screen')
    }
  }

  const handleEndCall = async () => {
    if (agoraClient && localTracks) {
      localTracks.audioTrack.close()
      localTracks.videoTrack.close()
      await leaveChannel(agoraClient)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center w-full py-4 px-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 md:text-base"
          >
            Go Dashboard
          </Link>
          <h1 className="text-white text-xl font-semibold">Interview Room</h1>
        </div>
        <div className="text-white">
          {profile?.full_name}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex-1 flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
          {/* Main video area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {remoteUsers.map(user => (
              <div
                key={user.uid}
                className="bg-black rounded-lg overflow-hidden relative aspect-video"
                ref={el => remoteVideoRefs.current[user.uid] = el}
              />
            ))}
            {/* Local video preview */}
            <div
              ref={localVideoRef}
              className="bg-black rounded-lg overflow-hidden relative aspect-video"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-gray-600'
            } hover:bg-opacity-80 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMuted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              )}
            </svg>
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoOff ? 'bg-red-500' : 'bg-gray-600'
            } hover:bg-opacity-80 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isVideoOff ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
          </button>

          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full ${
              isScreenSharing ? 'bg-green-500' : 'bg-gray-600'
            } hover:bg-opacity-80 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>

          <Link
            href="/dashboard"
            onClick={handleEndCall}
            className="p-4 rounded-full bg-red-500 hover:bg-opacity-80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function InterviewPage() {
  return (
    <InterviewContent />
  )
} 