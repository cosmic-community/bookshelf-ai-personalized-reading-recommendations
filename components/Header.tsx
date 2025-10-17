import Link from 'next/link'

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/30 shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group">
            <span className="text-5xl group-hover:scale-110 transition-transform duration-200">📚</span>
            <div>
              <h1 className="text-2xl font-black gradient-text">
                BookShelf AI
              </h1>
              <p className="text-xs text-gray-600 font-semibold tracking-wide">AI-POWERED RECOMMENDATIONS</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold text-sm"
            >
              Home
            </Link>
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold text-sm"
            >
              Powered by Cosmic
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}