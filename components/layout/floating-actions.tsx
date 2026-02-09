'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Phone, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuickContact from './quick-contact'

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Quick Contact Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <Button
            size="lg"
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 group"
            onClick={() => setIsQuickContactOpen(true)}
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        </motion.div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-background hover:bg-accent group"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Contact Modal */}
      <QuickContact isOpen={isQuickContactOpen} onClose={() => setIsQuickContactOpen(false)} />
    </>
  )
}
