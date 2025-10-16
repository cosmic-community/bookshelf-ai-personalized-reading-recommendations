import type { BookRecommendation } from '@/types'

interface RecommendationCardProps {
  recommendation: BookRecommendation
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const metadata = recommendation.metadata
  
  if (!metadata) {
    return null
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
      {metadata.cover_image_url && (
        <img
          src={`${metadata.cover_image_url}?w=600&h=800&fit=crop&auto=format,compress`}
          alt={metadata.recommended_book_title}
          className="w-full h-72 object-cover"
          width={300}
          height={450}
        />
      )}
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold line-clamp-2 flex-1">
              {metadata.recommended_book_title}
            </h3>
            {metadata.match_score && (
              <div className="ml-2 flex-shrink-0">
                <div className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
                  {metadata.match_score}%
                </div>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{metadata.author}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {metadata.genres && metadata.genres.length > 0 && (
            metadata.genres.map((genre) => {
              const genreMetadata = genre.metadata
              if (!genreMetadata) return null
              
              return (
                <span
                  key={genre.id}
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: genreMetadata.color_code || '#805AD5' }}
                >
                  {genreMetadata.genre_name || genre.title}
                </span>
              )
            })
          )}
        </div>
        
        <div className="bg-primary-light bg-opacity-10 rounded-lg p-4 mb-4 flex-1">
          <p className="text-sm font-medium text-gray-900 mb-2">Why we recommend this:</p>
          <p className="text-sm text-gray-700">{metadata.recommendation_reason}</p>
        </div>
        
        {metadata.based_on_books && (
          <p className="text-xs text-gray-600 mb-4">
            <strong>Based on:</strong> {metadata.based_on_books}
          </p>
        )}
        
        {metadata.book_description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {metadata.book_description}
          </p>
        )}
        
        {metadata.amazon_url && (
          <a
            href={metadata.amazon_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center mt-auto"
          >
            Buy on Amazon →
          </a>
        )}
      </div>
    </div>
  )
}