'use client'



export default function Loading() {
   
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#FF6933] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
}
