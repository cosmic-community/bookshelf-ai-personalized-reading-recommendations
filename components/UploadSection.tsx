'use client'

import { useState, useRef } from 'react'

export default function UploadSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
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

      // Redirect to session page
      window.location.href = `/sessions/${session.slug}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploading(false)
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Started Now</h2>
        <p className="text-gray-600">
          Upload a photo of your bookshelf to begin
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">⚠️</span>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!previewUrl ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900 mb-2">
                Click to upload your bookshelf photo
              </span>
              <span className="text-sm text-gray-500">
                or drag and drop
              </span>
              <span className="text-xs text-gray-400 mt-2">
                PNG, JPG, WEBP up to 10MB
              </span>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
              <img
                src={previewUrl}
                alt="Preview of your bookshelf"
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  onClick={handleClear}
                  disabled={uploading}
                  className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-6 w-6"
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
                <span className="flex items-center justify-center gap-2">
                  <span>🚀</span>
                  Analyze My Bookshelf
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <span className="text-2xl flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-medium text-blue-900 mb-1">
            Tips for the best results:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ensure book spines are clearly visible and readable</li>
            <li>• Use good lighting without glare or shadows</li>
            <li>• Capture as many books as possible in one photo</li>
            <li>• Hold camera steady for a sharp, clear image</li>
          </ul>
        </div>
      </div>
    </div>
  )
}