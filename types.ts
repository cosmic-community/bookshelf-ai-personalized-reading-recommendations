// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  thumbnail?: string
}

// Book Analysis Session
export interface BookAnalysisSession extends CosmicObject {
  type: 'book-analysis-sessions'
  metadata: {
    uploaded_image?: {
      url: string
      imgix_url: string
    }
    user_id?: string
    ai_analysis_status: {
      key: string
      value: string
    }
    total_books_detected?: number
    analysis_metadata?: {
      processing_time_ms?: number
      ai_model?: string
      confidence_threshold?: number
      image_resolution?: string
      detection_method?: string
    }
  }
}

// Genre Tag
export interface GenreTag extends CosmicObject {
  type: 'genre-tags'
  metadata: {
    genre_name?: string
    genre_description?: string
    color_code?: string
  }
}

// Detected Book
export interface DetectedBook extends CosmicObject {
  type: 'detected-books'
  metadata: {
    session?: BookAnalysisSession
    book_title: string
    author: string
    isbn?: string
    genres?: GenreTag[]
    publication_year?: number
    confidence_score?: number
    cover_image_url?: string
    amazon_asin?: string
    book_description?: string
  }
}

// Collection Insight
export interface CollectionInsight extends CosmicObject {
  type: 'collection-insights'
  metadata: {
    session?: BookAnalysisSession
    insight_type: {
      key: string
      value: string
    }
    insight_title: string
    insight_description: string
    data_visualization?: {
      chart_type?: string
      data?: Record<string, any>
      colors?: string[]
    }
    display_order?: number
  }
}

// Book Recommendation
export interface BookRecommendation extends CosmicObject {
  type: 'book-recommendations'
  metadata: {
    session?: BookAnalysisSession
    recommended_book_title: string
    author: string
    recommendation_reason: string
    genres?: GenreTag[]
    amazon_url?: string
    amazon_asin?: string
    cover_image_url?: string
    book_description?: string
    match_score?: number
    based_on_books?: string
    recommendation_order: number
  }
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip?: number
}

// Type guards
export function isBookAnalysisSession(obj: CosmicObject): obj is BookAnalysisSession {
  return obj.type === 'book-analysis-sessions'
}

export function isDetectedBook(obj: CosmicObject): obj is DetectedBook {
  return obj.type === 'detected-books'
}

export function isCollectionInsight(obj: CosmicObject): obj is CollectionInsight {
  return obj.type === 'collection-insights'
}

export function isBookRecommendation(obj: CosmicObject): obj is BookRecommendation {
  return obj.type === 'book-recommendations'
}

export function isGenreTag(obj: CosmicObject): obj is GenreTag {
  return obj.type === 'genre-tags'
}