import { CldUploadWidget } from 'next-cloudinary'

export type UploadResult = {
  secure_url: string
}

export const uploadToCloudinary = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: reader.result }),
        })
        const data = await response.json()
        if (data.error) {
          reject(new Error(data.error))
        } else {
          resolve(data.url)
        }
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = error => reject(error)
  })
} 