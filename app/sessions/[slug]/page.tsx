// app/sessions/[slug]/page.tsx
import { getSessionBySlug, getDetectedBooksBySession, getInsightsBySession, getRecommendationsBySession } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'
import InsightCard from '@/components/InsightCard'
import RecommendationCard from '@/components/RecommendationCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SessionPage({ params }: PageProps) {
  const { slug } = await params
  
  const session = await getSessionBySlug(slug)
  
  if (!session) {
    notFound()
  }
  
  const [detectedBooks, insights, recommendations] = await Promise.all([
    getDetectedBooksBySession(session.id),
    getInsightsBySession(session.id),
    getRecommendationsBySession(session.id),
  ])
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Link */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 transition-colors"
      >
        <span>←</span> Back to Home
      </Link>
      
      {/* Session Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {session.metadata?.uploaded_image && (
            <img
              src={`${session.metadata.uploaded_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={session.title}
              className="w-full md:w-1/3 rounded-lg shadow-md"
              width={300}
              height={200}
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{session.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <span>{session.metadata?.total_books_detected || 0} books detected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>{session.metadata?.ai_analysis_status?.value || 'Processing'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span>{new Date(session.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            {session.metadata?.analysis_metadata && (
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <p className="text-gray-600 mb-1">
                  <strong>AI Model:</strong> {session.metadata.analysis_metadata.ai_model}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Processing Time:</strong> {session.metadata.analysis_metadata.processing_time_ms}ms
                </p>
                <p className="text-gray-600">
                  <strong>Detection Method:</strong> {session.metadata.analysis_metadata.detection_method}
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
      
      {/* Detected Books */}
      {detectedBooks.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span>📚</span> Detected Books ({detectedBooks.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}