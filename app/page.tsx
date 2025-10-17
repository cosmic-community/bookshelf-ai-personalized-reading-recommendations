import UploadSection from '@/components/UploadSection'

export const revalidate = 60

export default async function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="mb-8 animate-float">
            <span className="text-8xl md:text-9xl drop-shadow-lg">📚</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text leading-tight tracking-tight">
            Discover Your Next<br />Great Read
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto font-medium leading-relaxed">
            Upload a photo of your bookshelf and get personalized AI-powered book recommendations
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our AI analyzes your reading collection to understand your taste and suggests books you'll love
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-medium">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🎯</span>
              <span className="text-sm font-medium">Highly Accurate</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium">Privacy First</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-20">
          <UploadSection />
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4 gradient-text">How It Works</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Three simple steps to personalized recommendations</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-dark rounded-3xl p-8 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">📸</span>
              </div>
              <div className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                STEP 1
              </div>
              <h3 className="text-2xl font-bold mb-3">Upload Your Photo</h3>
              <p className="text-gray-600 leading-relaxed">
                Take a clear photo of your bookshelf with visible book spines
              </p>
            </div>
            <div className="glass-dark rounded-3xl p-8 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🤖</span>
              </div>
              <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                STEP 2
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI identifies your books and analyzes your reading preferences
              </p>
            </div>
            <div className="glass-dark rounded-3xl p-8 text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">⭐</span>
              </div>
              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                STEP 3
              </div>
              <h3 className="text-2xl font-bold mb-3">Get Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized book suggestions tailored to your taste
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="glass-dark rounded-3xl p-10 md:p-16 shadow-glow">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4 gradient-text">What You'll Discover</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Unlock insights about your reading journey</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">💡</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Reading Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn about your reading patterns and genre preferences with detailed analytics
                </p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📊</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Collection Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  See detailed breakdowns of your book collection with visual charts
                </p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🎯</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get book suggestions based on what you already love with match scores
                </p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🔗</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Direct Links</h3>
                <p className="text-gray-600 leading-relaxed">
                  One-click access to purchase recommended books instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}