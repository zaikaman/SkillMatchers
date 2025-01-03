import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng'

const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID
if (!appId) {
  console.error('Agora App ID is not set in environment variables')
}

console.log('Agora App ID:', appId) // For debugging

export const createAgoraClient = () => {
  const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
  })

  return client
}

export const createLocalTracks = async () => {
  const [audioTrack, videoTrack] = await Promise.all([
    AgoraRTC.createMicrophoneAudioTrack(),
    AgoraRTC.createCameraVideoTrack(),
  ])

  return { audioTrack, videoTrack }
}

export const joinChannel = async (
  client: IAgoraRTCClient,
  channelName: string,
  token: string | null,
  uid: string | number
) => {
  if (!appId) {
    throw new Error('Agora App ID is not found in environment variables')
  }

  try {
    console.log('Joining channel with:', {
      appId,
      channelName,
      token,
      uid
    })
    await client.join(appId, channelName, token, uid)
    console.log('Successfully joined channel')
  } catch (error) {
    console.error('Error joining channel:', error)
    throw error
  }
}

export const leaveChannel = async (client: IAgoraRTCClient) => {
  await client.leave()
}

export type LocalTracks = {
  audioTrack: IMicrophoneAudioTrack
  videoTrack: ICameraVideoTrack
}

export type { IAgoraRTCClient, IAgoraRTCRemoteUser } 