'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, Home, MessageSquare, MoreVertical, X } from 'lucide-react'

type Message = {
  id: string
  text: string
  sender: 'user' | 'agent'
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'home' | 'chat'>('home')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello 👋 Welcome! How can we help you today?',
      sender: 'agent',
    },
  ])

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!message.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    }

    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setActiveTab('chat')

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! Our team will respond shortly.',
        sender: 'agent',
      }
      setMessages(prev => [...prev, reply])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full
        bg-blue-600 hover:bg-blue-700
        text-white shadow-xl
        flex items-center justify-center
        transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[95%] sm:w-[370px] h-[550px]
        bg-white rounded-3xl shadow-2xl overflow-hidden
        flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">

          {/* ===== HEADER ===== */}
          <div className="bg-[#2f3b46] text-white p-6 relative">
            
            {/* Avatars */}
            <div className="flex items-center gap-2 mb-4">
              <img src="/avatar1.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="/avatar2.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3" />
              <img src="/avatar3.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3" />
            </div>

            <h2 className="text-2xl font-semibold">Hi there 👋</h2>
            <p className="text-sm text-gray-300 mt-1">
              Welcome to our website. Ask us anything 🎉
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 hover:opacity-80"
            >
              <X size={18} />
            </button>
          </div>

          {/* ===== BODY ===== */}
          <div className="flex-1 bg-gray-100 relative">

            {/* HOME TAB */}
            {activeTab === 'home' && (
              <div className="p-5">
                <div
                  onClick={() => setActiveTab('chat')}
                  className="bg-white rounded-2xl shadow-md p-4 cursor-pointer
                  hover:shadow-lg transition-all flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Chat with us
                    </h3>
                    <p className="text-sm text-gray-500">
                      We reply immediately
                    </p>
                  </div>

                  <div className="bg-blue-600 p-2 rounded-full text-white">
                    <Send size={16} />
                  </div>
                </div>
              </div>
            )}

            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full">

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm max-w-xs
                        ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none shadow'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-white border-t">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="bg-blue-600 text-white p-2 rounded-full
                      hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===== BOTTOM NAV ===== */}
          <div className="bg-white border-t flex justify-around items-center py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center text-xs ${
                activeTab === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <Home size={18} />
              Home
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center text-xs ${
                activeTab === 'chat'
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <MessageSquare size={18} />
              Chat
            </button>
          </div>
        </div>
      )}
    </>
  )
}
