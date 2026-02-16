'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Smile, Paperclip, X, User, Bot, Clock, Check, CheckCheck, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
  isTyping?: boolean
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

interface QuickQuery {
  id: string
  text: string
  category: string
}

export default function LiveChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [agentName, setAgentName] = useState('Alex')
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQueries: QuickQuery[] = [
    { id: '1', text: 'What services do you offer?', category: 'services' },
    { id: '2', text: 'How can I hire IT professionals?', category: 'hiring' },
    { id: '3', text: 'What are your pricing plans?', category: 'pricing' },
    { id: '4', text: 'Do you provide 24/7 support?', category: 'support' },
    { id: '5', text: 'How quickly can you start?', category: 'timeline' }
  ]

  const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const generateAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('service')) {
      return `🚀 **Our Services**

We offer comprehensive IT solutions:

• **IT Staff Augmentation** - Access 1000+ pre-vetted IT professionals
• **Salesforce Consulting** - Certified experts for implementation and optimization  
• **Cloud Solutions** - AWS, Azure, and Google Cloud expertise
• **AI/ML Development** - Custom artificial intelligence solutions
• **Software Development** - Full-stack development using modern frameworks

Which service interests you most?`
    }
    
    if (message.includes('hire') || message.includes('professional')) {
      return `💼 **Hiring Process**

Our streamlined 4-step process:

1. **Discovery Call** (30 minutes)
   - Discuss your requirements and team structure

2. **Talent Matching** (24 hours)  
   - Identify 3-5 qualified candidates

3. **Interview Process** (48-72 hours)
   - You select the best fit

4. **Onboarding** (1 week)
   - Smooth integration process

Ready to schedule your discovery call?`
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return `💰 **Pricing Plans**

Flexible engagement options:

• **Contract-to-Hire**: $45-85/hour
• **Full-time Placement**: 15-20% of annual salary  
• **Project-based**: Custom quotes
• **Retainer**: Monthly packages

**Factors affecting rates:**
• Experience level (Junior, Mid, Senior)
• Technology stack complexity
• Project duration and scope

Need a custom quote?`
    }
    
    if (message.includes('support') || message.includes('24/7')) {
      return `🤝 **Support Services**

Yes! We provide comprehensive support:

• **24/7 Technical Support** - Round-the-clock assistance
• **Dedicated Account Manager** - Single point of contact
• **Emergency Response** - Under 1 hour response time
• **Regular Check-ins** - Weekly progress updates
• **Performance Monitoring** - Continuous optimization

What type of support do you need?`
    }
    
    if (message.includes('quick') || message.includes('start') || message.includes('timeline')) {
      return `⚡ **Timeline & Speed**

We pride ourselves on speed:

• **Initial Response**: Under 2 hours
• **Candidate Matching**: 24-48 hours
• **Interview Scheduling**: 48-72 hours
• **Project Kickoff**: Within 1 week
• **Full Team Deployment**: 2-3 weeks

**Urgent Requirements**: We can expedite for critical needs!

What's your timeline?`
    }
    
    return `Hello! 👋 I'm ${agentName}, your dedicated consultant at Apex Bridge Solutions.

I'm here to help you with:
• IT Staff Augmentation
• Salesforce Solutions  
• Cloud & AI Services
• Custom Development

How can I assist you today?`
  }

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: generateMessageId(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
        status: 'sending'
      }

      setMessages(prev => [...prev, userMessage])
      setMessage('')
      setIsTyping(true)

      // Update message status to sent
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'sent' as const }
              : msg
          )
        )
      }, 500)

      // Update to delivered
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'delivered' as const }
              : msg
          )
        )
      }, 1000)

      // Simulate agent typing and response
      setTimeout(() => {
        setIsTyping(false)
        const agentMessage: Message = {
          id: generateMessageId(),
          text: generateAgentResponse(message),
          sender: 'agent',
          timestamp: new Date(),
          status: 'delivered'
        }

        setMessages(prev => [...prev, agentMessage])
        
        // Update to read
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === agentMessage.id 
                ? { ...msg, status: 'read' as const }
                : msg
            )
          )
        }, 2000)
      }, 2000)
    }
  }

  const handleQuickQuery = (query: QuickQuery) => {
    setMessage(query.text)
    setTimeout(() => sendMessage(), 100)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Simulate agent availability changes
    const interval = setInterval(() => {
      setIsOnline(prev => prev)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group relative"
        >
          {isOnline && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
              </div>
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 ${isOnline ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{agentName}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    {isOnline ? (
                      <>
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
                        Online - Typically replies in minutes
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-1" />
                        Away
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Queries */}
            {messages.length === 0 && (
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm text-gray-600 mb-3">Quick queries:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQueries.map((query) => (
                    <Button
                      key={query.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuery(query)}
                      className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {query.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl p-3 relative`}>
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} flex items-center justify-between`}>
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.sender === 'user' && msg.status && (
                        <span className="ml-2">
                          {msg.status === 'sending' && <Clock className="h-3 w-3" />}
                          {msg.status === 'sent' && <Check className="h-3 w-3" />}
                          {msg.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                          {msg.status === 'read' && <CheckCheck className="h-3 w-3 text-blue-200" />}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="max-w-[70%] bg-gray-100 text-gray-900 rounded-2xl p-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-sm text-gray-600">{agentName} is typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim() || !isOnline}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                {isOnline ? 'Agent is online' : 'Agent is away - messages will be delivered when available'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
