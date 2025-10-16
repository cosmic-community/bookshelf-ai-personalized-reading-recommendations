'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-600">
          Error
        </h1>
        <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
        <p className="text-xl text-gray-600 mb-8">
          We encountered an error while loading this page.
        </p>
        <button
          onClick={() => reset()}
          className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}