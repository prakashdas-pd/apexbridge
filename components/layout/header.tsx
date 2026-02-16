'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './logo'

const navigation = [
  { 
    name: 'About Us', 
    href: '/about',
    // description: 'Learn about Apex Bridge Solutions - Your trusted IT partner for 10+ years',
    icon: '🏢'
  },
  { 
    name: 'Services', 
    href: '/services',
    icon: '⚡'
  },
  { 
    name: 'Solutions', 
    href: '/solutions',
    description: 'Comprehensive IT solutions tailored to transform your business operations',
    icon: '💡',
    children: [
      { 
        name: 'Digital Transformation', 
        href: '/solutions#digital-transformation',
        // description: 'Modernize your business with cutting-edge digital solutions'
      },
      { 
        name: 'Cloud Migration', 
        href: '/solutions#cloud-migration',
        // description: 'Seamless migration to cloud infrastructure'
      },
      { 
        name: 'AI Integration', 
        href: '/solutions#ai-integration',
        // description: 'Integrate AI solutions into your workflows'
      }
    ]
  },
  { 
    name: 'Portfolio', 
    href: '/portfolio',
    // description: 'Explore our successful projects and client success stories',
    icon: '📊'
  },
  { 
    name: 'More', 
    href: '#',
    icon: '📋',
    children: [
      { 
        name: 'Industries', 
        href: '/industries',
        // description: 'Serving diverse industries with specialized expertise'
      },
      { 
        name: 'Partners', 
        href: '/partners',
        // description: 'Our trusted partners and technology alliances'
      },
      { 
        name: 'Careers', 
        href: '/careers',
        // description: 'Join our growing team of IT professionals'
      },
      { 
        name: 'Contact', 
        href: '/contact',
        // description: 'Get in touch with our expert team'
      },
    ]
  },
]

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md",
        isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50",
        "shadow-lg"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item, index) => (
              <div 
                key={item.name} 
                className={cn(
                  "relative group",
                  "transition-all duration-300 hover:scale-105"
                )}
              >
                {item.children ? (
                  <div
                    className={cn(
                      "relative",
                      "transition-all duration-300"
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium px-4 py-2 rounded-lg",
                        "transition-all duration-300",
                        "hover:scale-105",
                        isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        handleDropdownToggle(item.name)
                      }}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    </Link>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative",
                      "transition-all duration-300"
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium px-4 py-2 rounded-lg",
                        "transition-all duration-300",
                        "hover:scale-105",
                        isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  </div>
                )}

                {/* Enhanced Dropdown Menu */}
                {activeDropdown === item.name && (
                  <div
                    className={cn(
                      "absolute top-full left-0 mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden",
                      "backdrop-blur-xl",
                      isDarkMode ? "bg-gray-800/95 border-gray-700/50" : "bg-white/95 border-gray-200/50",
                      "transform transition-all duration-300"
                    )}
                  >
                    {item.children ? (
                      <div className="p-4">
                        <h4 className={cn(
                          "text-sm font-semibold mb-3 px-2",
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        )}>
                          {item.description}
                        </h4>
                        <div className="space-y-2">
                          {item.children.map((child, childIndex) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "flex items-center px-4 py-3 text-sm rounded-lg",
                                "transition-all duration-300",
                                "hover:scale-105",
                                isDarkMode 
                                  ? "text-gray-300 hover:bg-gray-700 hover:text-white" 
                                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              )}
                            >
                              <span className="mr-3">📄</span>
                              <div>
                                <div className="font-medium">{child.name}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Connect With Us Button */}
            <button
              onClick={() => window.location.href = '/contact'}
              className={cn(
                "px-6 py-2 text-sm font-medium rounded-lg",
                "transition-all duration-300",
                "hover:scale-105",
                isDarkMode 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              )}
            >
              Connect With Us
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                "hover:scale-110",
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                "hover:scale-110"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden",
          isMobileMenuOpen ? "block" : "hidden"
        )}>
          <div className={cn(
            "px-2 pt-2 pb-3 space-y-1",
            isDarkMode ? "bg-gray-900/95" : "bg-white/95"
          )}>
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    "transition-all duration-300",
                    "hover:scale-105",
                    isDarkMode 
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
