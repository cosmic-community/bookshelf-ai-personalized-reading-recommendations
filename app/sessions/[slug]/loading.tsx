// app/sessions/[slug]/loading.tsx
export default function SessionLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex gap-6">
            <div className="w-1/3 h-48 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}