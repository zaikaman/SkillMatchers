import { supabase } from './supabase'

export async function uploadAvatar(file: File): Promise<string> {
  if (!file || !file.type.includes('image')) {
    throw new Error('Please upload an image file')
  }

  try {
    // Tạo tên file duy nhất với timestamp
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload file lên Supabase Storage bucket 'avatars'
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      })

    if (error) {
      console.error('Supabase Storage Error:', error.message)
      throw new Error(`Failed to upload avatar: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned from upload')
    }

    // Lấy URL public để xem file
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Failed to get public URL')
    }

    return publicUrl
  } catch (error) {
    console.error('Error uploading avatar:', error instanceof Error ? error.message : 'Unknown error')
    throw error
  }
}

export async function uploadCV(file: File): Promise<{ url: string; downloadUrl: string }> {
  if (!file || !file.type.includes('pdf')) {
    throw new Error('Please upload a PDF file')
  }

  try {
    // Tạo tên file duy nhất với timestamp
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload file lên Supabase Storage bucket 'cvs'
    const { data, error } = await supabase.storage
      .from('cvs')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase Storage Error:', error.message)
      throw new Error(`Failed to upload CV: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned from upload')
    }

    // Lấy URL public để xem file
    const { data: { publicUrl } } = supabase.storage
      .from('cvs')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Failed to get public URL')
    }

    // URL download sẽ giống với URL xem
    return {
      url: publicUrl,
      downloadUrl: publicUrl
    }
  } catch (error) {
    console.error('Error uploading CV:', error instanceof Error ? error.message : 'Unknown error')
    throw error
  }
}

export async function deleteCV(filePath: string) {
  try {
    const { error } = await supabase.storage
      .from('cvs')
      .remove([filePath])

    if (error) {
      console.error('Supabase Storage Delete Error:', error.message)
      throw new Error(`Failed to delete CV: ${error.message}`)
    }
  } catch (error) {
    console.error('Error deleting CV:', error instanceof Error ? error.message : 'Unknown error')
    throw error
  }
}

export async function deleteAvatar(filePath: string) {
  try {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([filePath])

    if (error) {
      console.error('Supabase Storage Delete Error:', error.message)
      throw new Error(`Failed to delete avatar: ${error.message}`)
    }
  } catch (error) {
    console.error('Error deleting avatar:', error instanceof Error ? error.message : 'Unknown error')
    throw error
  }
} 