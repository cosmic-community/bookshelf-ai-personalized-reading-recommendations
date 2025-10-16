import type { CollectionInsight } from '@/types'

interface InsightCardProps {
  insight: CollectionInsight
}

export default function InsightCard({ insight }: InsightCardProps) {
  const metadata = insight.metadata
  
  if (!metadata) {
    return null
  }
  
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'genre_breakdown':
        return '📊'
      case 'reading_level':
        return '📖'
      case 'publication_era':
        return '📅'
      case 'author_diversity':
        return '👥'
      case 'series_collection':
        return '📚'
      default:
        return '💡'
    }
  }
  
  const icon = getInsightIcon(metadata.insight_type?.key || '')
  
  return (
    <div className="bg-gradient-to-br from-primary-light to-secondary-light bg-opacity-10 rounded-xl p-6 border border-primary-light border-opacity-20 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {metadata.insight_title}
          </h3>
          <span className="text-xs text-gray-600 uppercase tracking-wide">
            {metadata.insight_type?.value || 'Insight'}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">
        {metadata.insight_description}
      </p>
      
      {metadata.data_visualization && metadata.data_visualization.data && (
        <div className="bg-white rounded-lg p-4 mt-4">
          {metadata.data_visualization.chart_type === 'pie' && (
            <div className="space-y-2">
              {Object.entries(metadata.data_visualization.data).map(([key, value], index) => {
                const colors = metadata.data_visualization?.colors || []
                const color = colors[index] || '#805AD5'
                
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-700">
                      {key}: {value}%
                    </span>
                  </div>
                )
              })}
            </div>
          )}
          
          {metadata.data_visualization.chart_type === 'timeline' && (
            <div className="space-y-2">
              {Object.entries(metadata.data_visualization.data).map(([year, count]) => (
                <div key={year} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 w-16">
                    {year}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full"
                      style={{ width: `${(Number(count) / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {count} {Number(count) === 1 ? 'book' : 'books'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}