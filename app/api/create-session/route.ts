import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { mediaName, userId } = await request.json()

    console.log('Create session request:', { mediaName, userId })

    if (!mediaName) {
      return NextResponse.json(
        { error: 'Media name is required' },
        { status: 400 }
      )
    }

    // Create a new book analysis session
    const sessionTitle = `Bookshelf Scan - ${new Date().toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric', 
      year: 'numeric' 
    })}`

    console.log('Creating session with title:', sessionTitle)
    console.log('Media name being saved:', mediaName)

    // For Cosmic file metafields, we need to pass just the media name string
    const session = await cosmic.objects.insertOne({
      title: sessionTitle,
      type: 'book-analysis-sessions',
      status: 'published',
      metadata: {
        uploaded_image: mediaName, // Just the media name string for file metafield
        user_id: userId || 'anonymous',
        ai_analysis_status: 'Pending',
        total_books_detected: 0,
        analysis_metadata: {
          processing_time_ms: 0,
          ai_model: 'cosmic-ai',
          confidence_threshold: 75,
          image_resolution: '1920x1080',
          detection_method: 'spine_text_recognition',
        },
      },
    })

    console.log('Session created successfully:', session.object.id)

    return NextResponse.json({ session })
  } catch (error) {
    console.error('Session creation error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: 'Failed to create session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}