export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full gradient-bg animate-pulse flex items-center justify-center">
          <span className="text-4xl animate-bounce">💘</span>
        </div>
        <div className="absolute -inset-4">
          <div className="w-32 h-32 rounded-full border-t-4 border-[--primary-color] animate-spin"></div>
        </div>
      </div>
      <h2 className="mt-8 text-xl font-semibold gradient-text animate-pulse">Loading...</h2>
    </div>
  )
} 