import type { DetectedBook } from '@/types'

interface BookCardProps {
  book: DetectedBook
}

export default function BookCard({ book }: BookCardProps) {
  const metadata = book.metadata
  
  if (!metadata) {
    return null
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {metadata.cover_image_url && (
        <img
          src={`${metadata.cover_image_url}?w=600&h=800&fit=crop&auto=format,compress`}
          alt={metadata.book_title}
          className="w-full h-64 object-cover"
          width={300}
          height={400}
        />
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{metadata.book_title}</h3>
        <p className="text-gray-600 text-sm mb-3">{metadata.author}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
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
        
        {metadata.book_description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {metadata.book_description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          {metadata.publication_year && (
            <span>📅 {metadata.publication_year}</span>
          )}
          {metadata.confidence_score && (
            <span className="font-medium text-primary">
              {metadata.confidence_score}% match
            </span>
          )}
        </div>
        
        {metadata.isbn && (
          <p className="text-xs text-gray-500 mt-2">ISBN: {metadata.isbn}</p>
        )}
      </div>
    </div>
  )
}