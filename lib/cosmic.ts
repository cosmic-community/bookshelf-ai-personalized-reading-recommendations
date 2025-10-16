import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// API Functions
import type {
  BookAnalysisSession,
  DetectedBook,
  CollectionInsight,
  BookRecommendation,
  GenreTag,
} from '@/types'

export async function getLatestSession(): Promise<BookAnalysisSession | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'book-analysis-sessions' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    const sessions = response.objects as BookAnalysisSession[]
    
    // Sort by created_at to get latest
    const sorted = sessions.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
    
    return sorted[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch latest session')
  }
}

export async function getSessionBySlug(slug: string): Promise<BookAnalysisSession | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'book-analysis-sessions', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail', 'created_at'])
      .depth(1)
    
    return response.object as BookAnalysisSession
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch session')
  }
}

export async function getDetectedBooksBySession(sessionId: string): Promise<DetectedBook[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'detected-books',
        'metadata.session': sessionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as DetectedBook[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch detected books')
  }
}

export async function getInsightsBySession(sessionId: string): Promise<CollectionInsight[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'collection-insights',
        'metadata.session': sessionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const insights = response.objects as CollectionInsight[]
    
    // Sort by display_order
    return insights.sort((a, b) => {
      const orderA = a.metadata?.display_order ?? 999
      const orderB = b.metadata?.display_order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch insights')
  }
}

export async function getRecommendationsBySession(sessionId: string): Promise<BookRecommendation[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'book-recommendations',
        'metadata.session': sessionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const recommendations = response.objects as BookRecommendation[]
    
    // Sort by recommendation_order
    return recommendations.sort((a, b) => {
      const orderA = a.metadata?.recommendation_order ?? 999
      const orderB = b.metadata?.recommendation_order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch recommendations')
  }
}

export async function getAllSessions(): Promise<BookAnalysisSession[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'book-analysis-sessions' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail', 'created_at'])
      .depth(1)
    
    const sessions = response.objects as BookAnalysisSession[]
    
    // Sort by created_at descending
    return sessions.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch sessions')
  }
}