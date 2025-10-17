export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="glass border-t border-white/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 gradient-text">
              <span>📚</span> BookShelf AI
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI-powered book recommendations based on your personal library. 
              Discover your next great read with intelligent analysis.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cosmicjs.com/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Technology</h4>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              Built with Next.js 15 and Cosmic headless CMS
            </p>
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors text-sm font-bold"
            >
              Learn more about Cosmic
              <span>→</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-8 text-center text-sm text-gray-600">
          <p className="font-medium">© {currentYear} BookShelf AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}