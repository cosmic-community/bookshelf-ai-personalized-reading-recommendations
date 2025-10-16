import { getLatestSession, getDetectedBooksBySession, getInsightsBySession, getRecommendationsBySession } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'
import InsightCard from '@/components/InsightCard'
import RecommendationCard from '@/components/RecommendationCard'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const session = await getLatestSession()
  
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            📚 Welcome to BookShelf AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload a photo of your bookshelf to get personalized reading recommendations powered by AI
          </p>
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <p className="text-gray-700 mb-4">
              No analysis sessions found yet. Start by uploading your first bookshelf photo!
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  const [detectedBooks, insights, recommendations] = await Promise.all([
    getDetectedBooksBySession(session.id),
    getInsightsBySession(session.id),
    getRecommendationsBySession(session.id),
  ])
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          📚 Your Reading Journey
        </h1>
        <p className="text-xl text-gray-600">
          AI-powered insights and recommendations based on your bookshelf
        </p>
      </div>
      
      {/* Latest Session Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {session.metadata?.uploaded_image && (
            <img
              src={`${session.metadata.uploaded_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt="Your bookshelf"
              className="w-full md:w-1/3 rounded-lg shadow-md"
              width={300}
              height={200}
            />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{session.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <span>{session.metadata?.total_books_detected || 0} books detected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>{session.metadata?.ai_analysis_status?.value || 'Processing'}</span>
              </div>
            </div>
            {session.metadata?.analysis_metadata && (
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <p className="text-gray-600 mb-1">
                  <strong>AI Model:</strong> {session.metadata.analysis_metadata.ai_model}
                </p>
                <p className="text-gray-600">
                  <strong>Processing Time:</strong> {session.metadata.analysis_metadata.processing_time_ms}ms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Collection Insights */}
      {insights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>💡</span> Collection Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}
      
      {/* Detected Books */}
      {detectedBooks.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>📚</span> Books Detected ({detectedBooks.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
      
      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>⭐</span> Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}