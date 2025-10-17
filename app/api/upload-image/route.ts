import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Convert File to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cosmic Media Library
    // The Cosmic SDK expects the media as a Buffer with proper metadata
    console.log('Calling Cosmic media.insertOne...')
    
    try {
      const uploadResponse = await cosmic.media.insertOne({
        media: {
          buffer: buffer,
          originalname: file.name,
          mimetype: file.type
        },
        folder: 'bookshelf-uploads'
      })

      console.log('Upload response received:', {
        name: uploadResponse.media.name,
        url: uploadResponse.media.url,
        imgix_url: uploadResponse.media.imgix_url
      })

      // Return the complete media object so the client can access all properties
      return NextResponse.json({ 
        media: uploadResponse.media 
      })
    } catch (uploadError) {
      console.error('Cosmic upload error:', uploadError)
      
      // If the object format doesn't work, try direct buffer upload
      console.log('Retrying with direct buffer...')
      const uploadResponse = await cosmic.media.insertOne({
        media: buffer,
        folder: 'bookshelf-uploads'
      })

      console.log('Upload response received:', {
        name: uploadResponse.media.name,
        url: uploadResponse.media.url,
        imgix_url: uploadResponse.media.imgix_url
      })

      return NextResponse.json({ 
        media: uploadResponse.media 
      })
    }
  } catch (error) {
    console.error('Upload error:', error)
    // Log the full error details to help debug
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}