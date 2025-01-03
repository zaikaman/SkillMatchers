/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'pjkcmfosyckukzofylrk.supabase.co',
      'i.pravatar.cc'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]  // required to make Konva & react-konva work
    return config
  },
}

// Kiểm tra biến môi trường
const requiredEnvs = ['NEXT_PUBLIC_AGORA_APP_ID']
requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    console.warn(`Warning: Environment variable ${env} is not set`)
  } else {
    console.log(`Environment variable ${env} is set:`, process.env[env])
  }
})

module.exports = nextConfig 