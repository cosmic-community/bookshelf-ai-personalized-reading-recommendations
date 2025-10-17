import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { GenreTag } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, imageUrl } = await request.json()

    console.log('Analyze bookshelf request:', { sessionId, imageUrl })

    if (!sessionId || !imageUrl) {
      return NextResponse.json(
        { error: 'Session ID and image URL are required' },
        { status: 400 }
      )
    }

    // Update session status to processing
    console.log('Updating session status to Processing...')
    await cosmic.objects.updateOne(sessionId, {
      metadata: {
        ai_analysis_status: 'Processing',
      },
    })

    const startTime = Date.now()

    // Use Cosmic AI to analyze the bookshelf image
    const prompt = `Analyze this bookshelf image and identify all visible books. For each book, provide:
1. Book title (exact as shown on spine)
2. Author name
3. ISBN (if visible)
4. Your confidence score (0-100)

Then provide:
- 2-3 collection insights about reading patterns, genre diversity, or publication eras
- 3 personalized book recommendations based on the detected collection

Return your response as a valid JSON object with this exact structure:
{
  "detected_books": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "isbn": "ISBN or null",
      "confidence_score": 85
    }
  ],
  "insights": [
    {
      "type": "genre_breakdown",
      "title": "Insight Title",
      "description": "Detailed insight description"
    }
  ],
  "recommendations": [
    {
      "title": "Recommended Book Title",
      "author": "Author Name",
      "reason": "Why this book is recommended based on detected collection",
      "match_score": 92,
      "based_on_books": "Book1, Book2"
    }
  ]
}

Important: Return ONLY the JSON object, no additional text.`

    // Call Cosmic AI API
    console.log('Calling Cosmic AI API...')
    const cosmicAIResponse = await fetch('https://api.cosmicjs.com/v3/ai/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.COSMIC_WRITE_KEY}`,
      },
      body: JSON.stringify({
        bucket_slug: process.env.COSMIC_BUCKET_SLUG,
        prompt,
        images: [imageUrl],
      }),
    })

    console.log('Cosmic AI response status:', cosmicAIResponse.status)

    if (!cosmicAIResponse.ok) {
      const errorText = await cosmicAIResponse.text()
      console.error('Cosmic AI error response:', errorText)
      throw new Error(`Cosmic AI request failed: ${cosmicAIResponse.statusText}`)
    }

    const cosmicAIData = await cosmicAIResponse.json()
    console.log('Cosmic AI response received')
    const processingTime = Date.now() - startTime

    // Parse AI response
    const content = cosmicAIData.response
    if (!content) {
      throw new Error('No response from Cosmic AI')
    }

    let analysisData
    try {
      analysisData = JSON.parse(content)
      console.log('AI analysis parsed successfully:', {
        books: analysisData.detected_books?.length || 0,
        insights: analysisData.insights?.length || 0,
        recommendations: analysisData.recommendations?.length || 0
      })
    } catch (e) {
      console.error('Failed to parse AI response:', content)
      throw new Error('Invalid AI response format')
    }

    // Fetch all genres for mapping
    console.log('Fetching genre tags...')
    const genresResponse = await cosmic.objects
      .find({ type: 'genre-tags' })
      .props(['id', 'title', 'slug', 'metadata'])

    const genres = genresResponse.objects as GenreTag[]
    console.log('Genres fetched:', genres.length)

    // Helper function to map genre names to genre IDs
    const mapGenresToIds = (bookTitle: string): string[] => {
      const genreKeywords: Record<string, string[]> = {
        'science-fiction': ['science', 'fiction', 'sci-fi', 'space', 'future'],
        'fantasy': ['fantasy', 'magic', 'dragon', 'wizard'],
        'mystery': ['mystery', 'detective', 'crime', 'murder'],
        'thriller': ['thriller', 'suspense', 'spy'],
        'literary-fiction': ['literary', 'contemporary', 'fiction'],
      }

      const matchedGenres: string[] = []
      const lowerTitle = bookTitle.toLowerCase()

      for (const [slug, keywords] of Object.entries(genreKeywords)) {
        if (keywords.some((keyword) => lowerTitle.includes(keyword))) {
          const genre = genres.find((g: GenreTag) => g.slug === slug)
          if (genre) {
            matchedGenres.push(genre.id)
          }
        }
      }

      // Default to literary-fiction if no matches
      if (matchedGenres.length === 0) {
        const defaultGenre = genres.find((g: GenreTag) => g.slug === 'literary-fiction')
        if (defaultGenre) {
          matchedGenres.push(defaultGenre.id)
        }
      }

      return matchedGenres
    }

    // Helper function to get book cover from Open Library
    const getBookCover = async (
      title: string,
      author: string
    ): Promise<string> => {
      try {
        const searchQuery = encodeURIComponent(`${title} ${author}`)
        const searchUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=1`

        const searchResponse = await fetch(searchUrl)
        const searchData = await searchResponse.json()

        if (searchData.docs && searchData.docs.length > 0) {
          const book = searchData.docs[0]
          if (book.cover_i) {
            return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          }
        }
      } catch (error) {
        console.error('Error fetching book cover:', error)
      }

      // Return placeholder image if no cover found
      return `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=2000&auto=format,compress`
    }

    // Create detected books in Cosmic
    console.log('Creating detected books...')
    const createdBooks = []
    for (const book of analysisData.detected_books || []) {
      const coverUrl = await getBookCover(book.title, book.author)
      const genreIds = mapGenresToIds(book.title)

      const createdBook = await cosmic.objects.insertOne({
        title: book.title,
        type: 'detected-books',
        status: 'published',
        metadata: {
          session: sessionId,
          book_title: book.title,
          author: book.author,
          isbn: book.isbn || '',
          genres: genreIds,
          confidence_score: book.confidence_score || 85,
          cover_image_url: coverUrl,
          book_description: `A book from your collection: ${book.title} by ${book.author}`,
        },
      })

      createdBooks.push(createdBook.object)
    }
    console.log('Detected books created:', createdBooks.length)

    // Create insights in Cosmic
    console.log('Creating insights...')
    const createdInsights = []
    for (let i = 0; i < (analysisData.insights || []).length; i++) {
      const insight = analysisData.insights[i]

      const createdInsight = await cosmic.objects.insertOne({
        title: insight.title,
        type: 'collection-insights',
        status: 'published',
        metadata: {
          session: sessionId,
          insight_type: insight.type || 'genre_breakdown',
          insight_title: insight.title,
          insight_description: insight.description,
          display_order: i + 1,
        },
      })

      createdInsights.push(createdInsight.object)
    }
    console.log('Insights created:', createdInsights.length)

    // Create recommendations in Cosmic
    console.log('Creating recommendations...')
    const createdRecommendations = []
    for (let i = 0; i < (analysisData.recommendations || []).length; i++) {
      const rec = analysisData.recommendations[i]
      const coverUrl = await getBookCover(rec.title, rec.author)
      const genreIds = mapGenresToIds(rec.title)

      const createdRec = await cosmic.objects.insertOne({
        title: rec.title,
        type: 'book-recommendations',
        status: 'published',
        metadata: {
          session: sessionId,
          recommended_book_title: rec.title,
          author: rec.author,
          recommendation_reason: rec.reason,
          genres: genreIds,
          cover_image_url: coverUrl,
          book_description: rec.reason,
          match_score: rec.match_score || 85,
          based_on_books: rec.based_on_books || '',
          recommendation_order: i + 1,
        },
      })

      createdRecommendations.push(createdRec.object)
    }
    console.log('Recommendations created:', createdRecommendations.length)

    // Update session with completion status
    console.log('Updating session to Completed...')
    await cosmic.objects.updateOne(sessionId, {
      metadata: {
        ai_analysis_status: 'Completed',
        total_books_detected: createdBooks.length,
        analysis_metadata: {
          processing_time_ms: processingTime,
          ai_model: 'cosmic-ai',
          confidence_threshold: 75,
          image_resolution: '1920x1080',
          detection_method: 'spine_text_recognition',
        },
      },
    })

    console.log('✅ Analysis complete!')

    return NextResponse.json({
      success: true,
      books_detected: createdBooks.length,
      insights_created: createdInsights.length,
      recommendations_created: createdRecommendations.length,
    })
  } catch (error) {
    console.error('❌ Analysis error:', error)

    // Try to update session status to failed
    try {
      const { sessionId } = await request.json()
      if (sessionId) {
        await cosmic.objects.updateOne(sessionId, {
          metadata: {
            ai_analysis_status: 'Failed',
          },
        })
      }
    } catch (e) {
      console.error('Failed to update session status:', e)
    }

    return NextResponse.json(
      { 
        error: 'Failed to analyze bookshelf', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}