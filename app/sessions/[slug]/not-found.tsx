// app/sessions/[slug]/not-found.tsx
import Link from 'next/link'

export default function SessionNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4">Session Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          The analysis session you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          View All Sessions
        </Link>
      </div>
    </div>
  )
}