'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState('')

  const generateVideo = async () => {
    setIsGenerating(true)
    setError(null)
    setVideoUrl(null)
    setProgress('ভিডিও তৈরি শুরু হচ্ছে...')

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('ভিডিও তৈরিতে ব্যর্থ')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setVideoUrl(data.videoUrl)
      setProgress('ভিডিও তৈরি সম্পন্ন!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            বাংলাদেশী শীতের সকাল
          </h1>
          <p className="text-center text-green-100 text-lg">
            Bangladeshi Winter Morning - AI Video Generator
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-t-4 border-green-600"
          >
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🌄 দৃশ্যের বর্ণনা / Scene Description
              </h2>
              <div className="text-gray-700 space-y-3 text-lg leading-relaxed">
                <p>
                  <strong>🌅 পরিবেশ:</strong> শীতের সকাল, ঘন কুয়াশা, গ্রামীণ পরিবেশ
                </p>
                <p>
                  <strong>👤 চরিত্র:</strong> বাংলাদেশী গ্রামের মানুষ - গায়ে চাদর, লুঙ্গি পরা
                </p>
                <p>
                  <strong>🏺 হাতে:</strong> খেজুরের রসের হাঁড়ি
                </p>
                <p>
                  <strong>🎬 দৃশ্য:</strong> গ্রামের রাস্তা দিয়ে হাঁটছে, সামনে খেজুর গাছ দৃশ্যমান
                </p>
                <p>
                  <strong>📹 ক্যামেরা:</strong> প্রফেশনাল মাল্টি-অ্যাঙ্গেল শুটিং, সিনেমাটিক কোয়ালিটি
                </p>
                <p>
                  <strong>🎨 স্টাইল:</strong> ফটোরিয়েলিস্টিক, হিউম্যান টাচ, বাস্তবসম্মত
                </p>
              </div>
            </div>
          </motion.div>

          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <button
              onClick={generateVideo}
              disabled={isGenerating}
              className={`
                px-12 py-5 rounded-full text-xl font-bold text-white shadow-2xl
                transform transition-all duration-300
                ${isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-3xl'
                }
              `}
            >
              {isGenerating ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  ভিডিও তৈরি হচ্ছে...
                </span>
              ) : (
                '🎬 ভিডিও তৈরি করুন / Generate Video'
              )}
            </button>
          </motion.div>

          {/* Progress */}
          <AnimatePresence>
            {progress && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-gray-700 font-medium">{progress}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <h3 className="text-red-800 font-bold text-lg mb-1">সমস্যা হয়েছে</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Player */}
          <AnimatePresence>
            {videoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-6 overflow-hidden"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  🎥 আপনার ভিডিও প্রস্তুত!
                </h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title="Bangladeshi Winter Morning Video"
                  />
                </div>
                <div className="mt-4 text-center space-y-3">
                  <p className="text-gray-600 text-sm">
                    ✨ প্রফেশনাল AI-জেনারেটেড ভিডিও | Professional Cinematic Animation
                  </p>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ফুলস্ক্রিনে দেখুন / View Fullscreen
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">প্রফেশনাল কোয়ালিটি</h3>
              <p className="text-gray-600">সিনেমাটিক ক্যামেরা ওয়ার্ক এবং মাল্টি-অ্যাঙ্গেল শুটিং</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <div className="text-4xl mb-3">🌾</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">বাংলাদেশী সংস্কৃতি</h3>
              <p className="text-gray-600">খেজুরের রস সংগ্রহের ঐতিহ্যবাহী দৃশ্য</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">AI চালিত</h3>
              <p className="text-gray-600">অত্যাধুনিক AI প্রযুক্তিতে তৈরি বাস্তবসম্মত ভিডিও</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-100">
            Made with ❤️ for Bangladesh | Powered by AI Technology
          </p>
        </div>
      </footer>
    </main>
  )
}
