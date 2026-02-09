'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Maximize2, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

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

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [chatData, setChatData] = useState<ChatData>({
    totalSessions: 0,
    activeSessions: 0,
    completedSessions: 0,
    abandonedSessions: 0,
    totalMessages: 0,
    averageResponseTime: 0,
    sessions: []
  })

  // Initialize chat data from localStorage
  useEffect(() => {
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
  }, [])

  // Save chat data to localStorage
  useEffect(() => {
    if (chatData.sessions.length > 0) {
      localStorage.setItem('chatData', JSON.stringify(chatData))
    }
  }, [chatData])

  // Initialize new session when chat opens
  useEffect(() => {
    if (isOpen && !currentSessionId) {
      const newSessionId = `session_${Date.now()}`
      setCurrentSessionId(newSessionId)
      
      const welcomeMessage: Message = {
        id: '1',
        text: 'Hello! Welcome to Apex Bridge Solutions. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        sessionId: newSessionId
      }
      
      setMessages([welcomeMessage])
      
      const newSession: ChatSession = {
        id: newSessionId,
        startTime: new Date(),
        messages: [welcomeMessage],
        status: 'active'
      }
      
      setChatData(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        activeSessions: prev.activeSessions + 1,
        totalMessages: prev.totalMessages + 1,
        sessions: [...prev.sessions, newSession]
      }))
    }
  }, [isOpen, currentSessionId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "Thank you for your message! Our team will get back to you shortly.",
      "I can help you with information about our IT staffing services. What would you like to know?",
      "Apex Bridge Solutions offers comprehensive IT services including Salesforce, Cloud, and AI solutions.",
      "Would you like me to connect you with one of our specialists?",
      "I can help you schedule a consultation. What time works best for you?",
      "Our services include IT Staff Augmentation, Salesforce Consulting, Cloud Solutions, and AI/ML development.",
      "Can I get your email address so our team can follow up with more detailed information?",
      "We have offices in major cities and also offer remote consulting services."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const sendMessage = () => {
    if (inputValue.trim() && currentSessionId) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
        sessionId: currentSessionId
      }

      setMessages(prev => [...prev, userMessage])
      setInputValue('')
      setIsTyping(true)

      // Update session with user message
      setChatData(prev => ({
        ...prev,
        totalMessages: prev.totalMessages + 1,
        sessions: prev.sessions.map(session =>
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, userMessage] }
            : session
        )
      }))

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(inputValue),
          sender: 'bot',
          timestamp: new Date(),
          sessionId: currentSessionId
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)

        // Update session with bot message
        setChatData(prev => ({
          ...prev,
          totalMessages: prev.totalMessages + 1,
          sessions: prev.sessions.map(session =>
            session.id === currentSessionId
              ? { ...session, messages: [...session.messages, botMessage] }
              : session
        )
        }))
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const endSession = (status: 'completed' | 'abandoned') => {
    if (currentSessionId) {
      const endTime = new Date()
      
      setChatData(prev => ({
        ...prev,
        activeSessions: prev.activeSessions - 1,
        completedSessions: status === 'completed' ? prev.completedSessions + 1 : prev.completedSessions,
        abandonedSessions: status === 'abandoned' ? prev.abandonedSessions + 1 : prev.abandonedSessions,
        sessions: prev.sessions.map(session =>
          session.id === currentSessionId
            ? { ...session, endTime, status }
            : session
        )
      }))
      
      setCurrentSessionId('')
      setMessages([])
    }
  }

  const downloadChatData = () => {
    const dataStr = JSON.stringify(chatData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `chat_data_${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const clearChatData = () => {
    if (confirm('Are you sure you want to clear all chat data? This action cannot be undone.')) {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white group relative"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          {chatData.activeSessions > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      </motion.div>

      {/* Admin Access Button */}
      <motion.div
        className="fixed bottom-6 left-24 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <Link href="/admin/login">
          <Button
            size="lg"
            className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            title="Admin Login"
          >
            <Bot className="h-5 w-5" />
          </Button>
        </Link>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 left-6 z-50 w-80 h-[500px] bg-background rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-semibold">Apex Support</span>
                  {chatData.activeSessions > 0 && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="hover:bg-white/20 text-white"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      endSession('abandoned')
                      setIsOpen(false)
                    }}
                    className="hover:bg-white/20 text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      } rounded-2xl px-4 py-2`}>
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted text-foreground rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[40px] max-h-[100px] resize-none"
                    />
                    <Button onClick={sendMessage} size="icon" disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
