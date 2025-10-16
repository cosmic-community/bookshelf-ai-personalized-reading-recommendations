import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { mediaName, userId } = await request.json()

    if (!mediaName) {
      return NextResponse.json(
        { error: 'Media name is required' },
        { status: 400 }
      )
    }

    // Create a new book analysis session
    const timestamp = new Date().toISOString()
    const sessionTitle = `Bookshelf Scan - ${new Date().toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric', 
      year: 'numeric' 
    })}`

    const session = await cosmic.objects.insertOne({
      title: sessionTitle,
      type: 'book-analysis-sessions',
      status: 'published',
      metadata: {
        uploaded_image: mediaName,
        user_id: userId || 'anonymous',
        ai_analysis_status: 'Pending',
        total_books_detected: 0,
        analysis_metadata: {
          processing_time_ms: 0,
          ai_model: 'gpt-4-vision',
          confidence_threshold: 75,
          image_resolution: '1920x1080',
          detection_method: 'spine_text_recognition',
        },
      },
    })

    return NextResponse.json({ session })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}