export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>📚</span> BookShelf AI
            </h3>
            <p className="text-gray-600 text-sm">
              AI-powered book recommendations based on your personal library. 
              Discover your next great read.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cosmicjs.com/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Technology</h4>
            <p className="text-gray-600 text-sm mb-2">
              Built with Next.js 15 and Cosmic headless CMS
            </p>
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
            >
              Learn more about Cosmic →
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {currentYear} BookShelf AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}