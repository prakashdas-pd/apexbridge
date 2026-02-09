'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, AlertTriangle, ArrowLeft, Sparkles, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface AdminUser {
  id: string
  username: string
  email: string
  password: string
  role: string
  name: string
  lastLogin?: Date
}

export default function AdminLogin() {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Admin users database (in production, this should be in a secure backend)
  const adminUsers: AdminUser[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@apexbridgesolutions.com',
      password: 'admin123',
      role: 'Super Admin',
      name: 'System Administrator'
    },
    {
      id: '2',
      username: 'manager',
      email: 'manager@apexbridgesolutions.com',
      password: 'manager123',
      role: 'Chat Manager',
      name: 'Chat Support Manager'
    },
    {
      id: '3',
      username: 'analyst',
      email: 'analyst@apexbridgesolutions.com',
      password: 'analyst123',
      role: 'Data Analyst',
      name: 'Business Analyst'
    }
  ]

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated')
    const currentUser = localStorage.getItem('adminUser')
    
    if (authStatus === 'true' && currentUser) {
      // Redirect to dashboard if already authenticated
      window.location.href = '/admin/dashboard'
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const user = adminUsers.find(u => 
      u.username === loginForm.username && 
      u.password === loginForm.password
    )
    
    if (user) {
      setIsSuccess(true)
      // Store authentication state
      localStorage.setItem('adminAuthenticated', 'true')
      localStorage.setItem('adminUser', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        lastLogin: new Date().toISOString()
      }))
      
      // Redirect to dashboard after success animation
      setTimeout(() => {
        window.location.href = '/admin/dashboard'
      }, 1500)
    } else {
      setError('Invalid username or password. Please try again.')
      setLoginForm({ username: '', password: '' })
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 25 }}
          className="w-full max-w-md"
        >
          <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 animate-pulse" />
            
            <CardHeader className="text-center relative z-10 pb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', damping: 15 }}
                className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-3xl animate-pulse opacity-50" />
                <Shield className="h-10 w-10 text-white relative z-10" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CardTitle className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Admin Access
                </CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  Apex Bridge Solutions - Secure Portal
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-2">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="login-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="relative"
                    >
                      <div className="absolute left-3 top-3 text-slate-400">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Shield className="h-4 w-4" />
                        </motion.div>
                      </div>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                        className="pl-12 bg-slate-700/50 backdrop-blur-sm border-slate-600/50 text-white placeholder:text-slate-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute left-3 top-3 text-slate-400">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          <Lock className="h-4 w-4" />
                        </motion.div>
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-12 pr-12 bg-slate-700/50 backdrop-blur-sm border-slate-600/50 text-white placeholder:text-slate-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: 2 }}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </motion.div>
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                        disabled={isLoading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {isLoading ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center"
                          >
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                            <span>Authenticating...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center"
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            <span>Sign In</span>
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="h-10 w-10 text-white" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Login Successful!</h3>
                    <p className="text-slate-400">Redirecting to dashboard...</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-8 p-4 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/30"
              >
                <p className="text-xs text-slate-400 font-medium mb-3">Demo Credentials:</p>
                <div className="space-y-2 text-xs text-slate-500">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-2 bg-slate-700/50 rounded-lg"
                  >
                    <span>admin / admin123</span>
                    <span className="text-blue-400">Super Admin</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-2 bg-slate-700/50 rounded-lg"
                  >
                    <span>manager / manager123</span>
                    <span className="text-green-400">Chat Manager</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-2 bg-slate-700/50 rounded-lg"
                  >
                    <span>analyst / analyst123</span>
                    <span className="text-purple-400">Data Analyst</span>
                  </motion.div>
                </div>
                <p className="text-xs text-slate-600 mt-3 text-center">Change these in production for security</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6 text-center"
              >
                <Link 
                  href="/" 
                  className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </motion.div>
                  Back to Website
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
