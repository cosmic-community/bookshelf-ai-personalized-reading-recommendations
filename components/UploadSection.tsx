'use client'

import { useState, useRef } from 'react'

export default function UploadSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setError(null)

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setError(null)

    try {
      // Step 1: Upload image to Cosmic
      const formData = new FormData()
      formData.append('file', selectedFile)

      const uploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }

      const { media } = await uploadResponse.json()

      // Step 2: Create analysis session
      const sessionResponse = await fetch('/api/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaName: media.name,
          userId: 'user_' + Date.now(),
        }),
      })

      if (!sessionResponse.ok) {
        throw new Error('Failed to create analysis session')
      }

      const { session } = await sessionResponse.json()

      setUploading(false)
      setAnalyzing(true)

      // Step 3: Trigger AI analysis
      const analysisResponse = await fetch('/api/analyze-bookshelf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.object.id,
          imageUrl: media.imgix_url,
        }),
      })

      if (!analysisResponse.ok) {
        throw new Error('Failed to analyze bookshelf')
      }

      // Redirect to session page
      window.location.href = `/sessions/${session.object.slug}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploading(false)
      setAnalyzing(false)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isProcessing = uploading || analyzing

  return (
    <div className="glass-dark rounded-3xl shadow-glow p-8 md:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-3 gradient-text">
          Get Started Now
        </h2>
        <p className="text-gray-600 text-lg">
          Upload a photo of your bookshelf to begin your journey
        </p>
      </div>

      {error && (
        <div className="mb-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-2xl animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-red-500 text-2xl">⚠️</span>
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!previewUrl ? (
          <div className="border-3 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer group">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={isProcessing}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 mb-3">
                Click to upload your bookshelf photo
              </span>
              <span className="text-base text-gray-500 mb-2">
                or drag and drop
              </span>
              <span className="text-sm text-gray-400 mt-1">
                PNG, JPG, WEBP up to 10MB
              </span>
            </label>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-purple-200 shadow-xl">
              <img
                src={previewUrl}
                alt="Preview of your bookshelf"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClear}
                  disabled={isProcessing}
                  className="glass-dark rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 disabled:opacity-50 group"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-5 rounded-2xl font-bold text-xl hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shine hover:scale-[1.02]"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading Image...
                </span>
              ) : analyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing Your Books...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Analyze My Bookshelf
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
        <span className="text-3xl flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
            Tips for the best results
          </p>
          <ul className="text-sm text-blue-800 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Ensure book spines are clearly visible and readable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Use good lighting without glare or shadows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Capture as many books as possible in one photo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>Hold camera steady for a sharp, clear image</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}