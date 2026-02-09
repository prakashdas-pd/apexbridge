'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Trash2, Search, Filter, MessageCircle, Users, Clock, CheckCircle, AlertCircle, LogOut, Shield, User, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  name: string
  lastLogin?: Date
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  sessionId: string
}

interface ChatSession {
  id: string
  startTime: Date
  endTime?: Date
  messages: Message[]
  status: 'active' | 'completed' | 'abandoned'
  userInfo?: {
    name?: string
    email?: string
    phone?: string
  }
}

interface ChatData {
  totalSessions: number
  activeSessions: number
  completedSessions: number
  abandonedSessions: number
  totalMessages: number
  averageResponseTime: number
  sessions: ChatSession[]
}

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [chatData, setChatData] = useState<ChatData>({
    totalSessions: 0,
    activeSessions: 0,
    completedSessions: 0,
    abandonedSessions: 0,
    totalMessages: 0,
    averageResponseTime: 0,
    sessions: []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'abandoned'>('all')

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated')
    const userData = localStorage.getItem('adminUser')
    
    if (authStatus !== 'true' || !userData) {
      // Redirect to login if not authenticated
      window.location.href = '/admin/login'
      return
    }

    try {
      const user = JSON.parse(userData)
      setCurrentUser(user)
      
      // Load chat data
      const storedData = localStorage.getItem('chatData')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setChatData({
          ...parsedData,
          sessions: parsedData.sessions.map((session: any) => ({
            ...session,
            startTime: new Date(session.startTime),
            endTime: session.endTime ? new Date(session.endTime) : undefined,
            messages: session.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }))
        })
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      window.location.href = '/admin/login'
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  const downloadChatData = () => {
    const dataStr = JSON.stringify({
      ...chatData,
      exportedBy: currentUser?.name,
      exportedAt: new Date().toISOString(),
      exportedRole: currentUser?.role
    }, null, 2)
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `chat_data_${new Date().toISOString().split('T')[0]}_${currentUser?.username}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const clearChatData = () => {
    if (confirm('Are you sure you want to clear all chat data? This action will be logged and cannot be undone.')) {
      // Log action
      const actionLog = {
        action: 'CLEAR_ALL_DATA',
        performedBy: currentUser?.name,
        role: currentUser?.role,
        timestamp: new Date().toISOString()
      }
      
      // Store action log (in production, this should go to a secure backend)
      const existingLogs = JSON.parse(localStorage.getItem('adminActionLogs') || '[]')
      existingLogs.push(actionLog)
      localStorage.setItem('adminActionLogs', JSON.stringify(existingLogs))
      
      setChatData({
        totalSessions: 0,
        activeSessions: 0,
        completedSessions: 0,
        abandonedSessions: 0,
        totalMessages: 0,
        averageResponseTime: 0,
        sessions: []
      })
      localStorage.removeItem('chatData')
    }
  }

  const filteredSessions = chatData.sessions.filter(session => {
    const matchesSearch = session.messages.some(msg => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Verifying Authentication...</h2>
          <p className="text-slate-400">Please wait while we verify your credentials.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-green-500/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800/90 backdrop-blur-xl border-b border-slate-700/50 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                <MessageCircle className="h-8 w-8 text-primary relative z-10" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                  Chat Analytics Dashboard
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-slate-400 text-sm"
                >
                  Apex Bridge Solutions Admin
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-right"
              >
                <p className="text-sm text-white font-medium">{currentUser?.name}</p>
                <p className="text-xs text-slate-400">{currentUser?.role}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* User Info Banner */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">{currentUser?.email}</span>
              </motion.div>
              {currentUser?.lastLogin && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-300">
                    Last login: {formatDate(new Date(currentUser.lastLogin))} at {formatTime(new Date(currentUser.lastLogin))}
                  </span>
                </motion.div>
              )}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Shield className="h-4 w-4 text-green-400" />
              </motion.div>
              <span className="text-sm text-green-400">Authenticated</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, type: 'spring', damping: 20 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 relative"
                >
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl animate-pulse" />
                  <MessageCircle className="h-6 w-6 text-blue-500 relative z-10" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {chatData.totalSessions}
                  </div>
                  <div className="text-slate-400">Total Sessions</div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, type: 'spring', damping: 20 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)',
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 relative"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-xl animate-pulse" />
                  <Users className="h-6 w-6 text-green-500 relative z-10" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    {chatData.activeSessions}
                  </div>
                  <div className="text-slate-400">Active Sessions</div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, type: 'spring', damping: 20 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 relative"
                >
                  <div className="absolute inset-0 bg-purple-500/20 rounded-xl animate-pulse" />
                  <CheckCircle className="h-6 w-6 text-purple-500 relative z-10" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    {chatData.completedSessions}
                  </div>
                  <div className="text-slate-400">Completed</div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, type: 'spring', damping: 20 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 text-center relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 relative"
                >
                  <div className="absolute inset-0 bg-orange-500/20 rounded-xl animate-pulse" />
                  <Clock className="h-6 w-6 text-orange-500 relative z-10" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    {chatData.totalMessages}
                  </div>
                  <div className="text-slate-400">Total Messages</div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex flex-col sm:flex-row gap-4 flex-1"
                >
                  <div className="flex-1">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute left-3 top-3 text-slate-400"
                      >
                        <Search className="h-4 w-4" />
                      </motion.div>
                      <Input
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700/50 backdrop-blur-sm border-slate-600/50 text-white placeholder:text-slate-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <motion.select
                    whileHover={{ scale: 1.02 }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-2 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white transition-all duration-300 hover:border-slate-500/50"
                  >
                    <option value="all">All Sessions</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="abandoned">Abandoned</option>
                  </motion.select>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={downloadChatData}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                      </motion.div>
                      Export Data
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={clearChatData}
                      variant="outline"
                      className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                      </motion.div>
                      Clear All
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sessions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="space-y-4"
        >
          {filteredSessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50">
                <CardContent className="p-12 text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <AlertCircle className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-white mb-2">No chat sessions found</h3>
                  <p className="text-slate-400">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria' 
                      : 'No chat sessions have been recorded yet'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.4 + (index * 0.1),
                  type: 'spring',
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 hover:bg-slate-750/90 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <motion.h3 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.5 + (index * 0.1) }}
                          className="text-lg text-white font-semibold"
                        >
                          Session #{session.id.split('_')[1]}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.6 + (index * 0.1) }}
                          className="text-slate-400"
                        >
                          Started: {formatDate(session.startTime)} at {formatTime(session.startTime)}
                          {session.endTime && (
                            <> • Ended: {formatTime(session.endTime)}</>
                          )}
                        </motion.p>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.7 + (index * 0.1) }}
                        className="flex items-center space-x-3"
                      >
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                            session.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' :
                            session.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                          }`}
                        >
                          {session.status}
                        </motion.span>
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded-lg"
                        >
                          {session.messages.length} messages
                        </motion.span>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.8 + (index * 0.1) }}
                      className="space-y-3"
                    >
                      {session.messages.slice(0, 3).map((message, msgIndex) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 1.9 + (index * 0.1) + (msgIndex * 0.05)
                          }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-start space-x-3 text-sm group/message"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: message.sender === 'user' ? [0, 5, -5, 0] : [0, -5, 5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: msgIndex * 0.5 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/message:scale-110 ${
                              message.sender === 'user' ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg' : 'bg-slate-700/80 backdrop-blur-sm'
                            }`}
                          >
                            {message.sender === 'user' ? (
                              <Users className="h-4 w-4" />
                            ) : (
                              <MessageCircle className="h-4 w-4" />
                            )}
                          </motion.div>
                          <div className="flex-1">
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 2.0 + (index * 0.1) + (msgIndex * 0.05) }}
                              className="font-medium text-white mb-1"
                            >
                              {message.sender === 'user' ? 'User' : 'Bot'}
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 2.1 + (index * 0.1) + (msgIndex * 0.05) }}
                              className="text-slate-400 line-clamp-2 group-hover/message:text-slate-300 transition-colors duration-300"
                            >
                              {message.text}
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 2.2 + (index * 0.1) + (msgIndex * 0.05) }}
                              className="text-xs text-slate-500 mt-1"
                            >
                              {formatTime(message.timestamp)}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                      {session.messages.length > 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 2.3 + (index * 0.1) }}
                          className="text-sm text-slate-500 text-center pt-2 bg-slate-700/30 rounded-lg p-2"
                        >
                          ... and {session.messages.length - 3} more messages
                        </motion.div>
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
