'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Logo from './logo'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { 
    name: 'Roles', 
    href: '/roles',
    children: [
      { name: 'Salesforce Developers / Admins', href: '/roles#salesforce' },
      { name: 'Cloud Engineers', href: '/roles#cloud' },
      { name: 'AI Engineers', href: '/roles#ai' },
      { name: 'Software Developers', href: '/roles#software' },
      { name: 'QA & Support Engineers', href: '/roles#qa' },
    ]
  },
  { name: 'Industries', href: '/industries' },
  { name: 'Partners', href: '/partners' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Logo />
        </motion.div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item, index) => (
              <motion.div 
                key={item.name} 
                className="relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.children ? (
                  <div className="relative">
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </Link>
                    <motion.div 
                      className="absolute left-0 mt-2 w-64 rounded-md bg-background shadow-lg ring-1 ring-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top"
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false }}
                    >
                      <div className="py-2">
                        {item.children.map((child, childIndex) => (
                          <motion.div
                            key={child.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:pl-6"
                            >
                              {child.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="hidden lg:flex lg:items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button asChild className="group">
              <Link href="/contact" className="transition-all duration-300 hover:scale-105">
                Get Started
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="flex lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:bg-accent transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    {item.children ? (
                      <div className="space-y-1">
                        <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                          {item.name}
                        </div>
                        <div className="pl-6 space-y-1">
                          {item.children.map((child) => (
                            <motion.div
                              key={child.name}
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                href={child.href}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.div 
                className="px-3 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
