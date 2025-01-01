import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

// Cấu hình Cloudinary chỉ ở phía server
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const { image } = await request.json()
    
    // Upload ảnh lên Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'skillmatch/avatars',
      transformation: [
        { width: 400, height: 400, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    })

    return NextResponse.json({ url: uploadResponse.secure_url })
  } catch (error) {
    console.error('Error in upload route:', error)
    return NextResponse.json(
      { error: 'Error uploading image' },
      { status: 500 }
    )
  }
} 