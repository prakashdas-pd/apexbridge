'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Section {
  id: string
  label: string
  icon?: string
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
]

export default function ProgressIndicator() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)

      // Determine active section
      const sectionElements = sections
        .map(section => ({
          id: section.id,
          element: document.getElementById(section.id)
        }))
        .filter(section => section.element)

      for (const section of sectionElements) {
        const rect = section.element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
        />
      </div>

      {/* Side Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-background/80 backdrop-blur-sm border rounded-full p-2 shadow-lg">
          <div className="flex flex-col space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
                title={section.label}
              >
                <span className="text-xs font-medium">
                  {section.label.charAt(0)}
                </span>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {section.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Progress Dots */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <div className="bg-background/80 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg">
          <div className="flex space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                title={section.label}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
