import UploadSection from '@/components/UploadSection'

export const revalidate = 60

export default async function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-7xl md:text-8xl">📚</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Upload a photo of your bookshelf and get personalized AI-powered book recommendations
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our AI analyzes your reading collection to understand your taste and suggests books you'll love
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-16">
          <UploadSection />
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="text-xl font-bold mb-2">1. Upload Your Photo</h3>
              <p className="text-gray-600">
                Take a clear photo of your bookshelf with visible book spines
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our AI identifies your books and analyzes your reading preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold mb-2">3. Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized book suggestions tailored to your taste
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">What You'll Discover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Reading Insights</h3>
                <p className="text-gray-600">
                  Learn about your reading patterns and genre preferences
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Collection Analysis</h3>
                <p className="text-gray-600">
                  See detailed breakdowns of your book collection
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Smart Recommendations</h3>
                <p className="text-gray-600">
                  Get book suggestions based on what you already love
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-2xl">🔗</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Direct Links</h3>
                <p className="text-gray-600">
                  One-click access to purchase recommended books
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}