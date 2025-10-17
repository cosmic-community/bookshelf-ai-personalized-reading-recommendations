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

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cosmic Media Library
    // The Cosmic SDK's media.insertOne returns a response with the media object
    const uploadResponse = await cosmic.media.insertOne({
      media: buffer,
      folder: 'bookshelf-uploads'
    })

    // The response structure from Cosmic SDK is { media: { name, url, imgix_url, ... } }
    // Return the complete media object so the client can access all properties
    return NextResponse.json({ 
      media: uploadResponse.media 
    })
  } catch (error) {
    console.error('Upload error:', error)
    // Log the full error details to help debug
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}