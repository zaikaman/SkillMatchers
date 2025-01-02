import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useRouter } from 'next/navigation'

interface MatchAlertProps {
  isVisible: boolean
  onClose: () => void
  employerName: string
  employerAvatar: string
  workerName: string
  workerAvatar: string
}

export default function MatchAlert({
  isVisible,
  onClose,
  employerName,
  employerAvatar,
  workerName,
  workerAvatar
}: MatchAlertProps) {
  const { width, height } = useWindowSize()
  const [shouldRender, setShouldRender] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    }
  }, [isVisible])

  const handleClose = () => {
    setShouldRender(false)
    // Give time for exit animation
    setTimeout(onClose, 500)
  }

  const handleStartChatting = () => {
    handleClose()
    router.push('/matches')
  }

  return (
    <AnimatePresence mode="wait">
      {(isVisible || shouldRender) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
        >
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            recycle={true}
            run={true}
            colors={['#EC4899', '#BE185D', '#FDF2F8', '#FBCFE8']}
          />
          
          <div className="text-center px-4 relative">
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-6xl font-bold text-white mb-8"
            >
              It&apos;s a Match!
            </motion.div>

            <div className="flex justify-center items-center gap-8 mb-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={employerAvatar || '/default-avatar.png'}
                    alt={employerName}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-white font-medium">{employerName}</div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-pink-500 text-4xl"
              >
                ❤️
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={workerAvatar || '/default-avatar.png'}
                    alt={workerName}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-white font-medium">{workerName}</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="text-white text-lg mb-4">
                You can now start chatting!
              </div>
              
              <button
                onClick={handleStartChatting}
                className="px-8 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
              >
                Start Chatting
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 