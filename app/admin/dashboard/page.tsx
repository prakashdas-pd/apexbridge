'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  BarChart3, 
  Mail, 
  Phone,
  Building,
  TrendingUp,
  Clock,
  Eye,
  Search,
  Download,
  RefreshCw,
  Briefcase,
  MessageCircle,
  User,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface BaseDataItem {
  id: string
  status: string
  createdAt?: string | Date
  [key: string]: any
}

interface ChatSession extends BaseDataItem {
  startTime: Date | string
  endTime?: Date | string
  messages: Message[]
  status: 'active' | 'completed' | 'abandoned'
  userInfo?: {
    name?: string
    email?: string
    phone?: string
  }
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date | string
  sessionId: string
}

interface Contact extends BaseDataItem {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  budget: string
  createdAt: Date | string
}

interface Booking extends BaseDataItem {
  name: string
  email: string
  phone: string
  company: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  meetingType: string
  timezone: string
  status: string
  createdAt?: Date | string
}

interface Inquiry extends BaseDataItem {
  service: string
  requirements: string
  budget: string
  timeline: string
  status: string
  createdAt: Date | string
}

interface JobApplication extends BaseDataItem {
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  location: string
  experience: string
  currentSalary: string
  expectedSalary: string
  availability: string
  resume: string
  coverLetter?: string
  linkedin?: string
  github?: string
  portfolio?: string
  status: string
  createdAt: Date | string
}

// Mock data - in production, this would come from API
const mockData = {
  stats: {
    totalContacts: 156,
    totalBookings: 89,
    totalInquiries: 234,
    totalJobApplications: 67,
    totalChatSessions: 342,
    activeUsers: 45
  },
  contacts: [
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@company.com',
      phone: '+91 9876543210',
      company: 'Tech Solutions Pvt Ltd',
      service: 'STAFF_AUGMENTATION',
      message: 'We need 5 senior developers for our upcoming project.',
      budget: '$50,000',
      status: 'NEW',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.p@startup.in',
      phone: '+91 9123456789',
      company: 'InnovateTech',
      service: 'SALESFORCE',
      message: 'Looking for Salesforce implementation and customization.',
      budget: '$25,000',
      status: 'CONTACTED',
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      email: 'amit.k@enterprise.com',
      phone: '+91 8765432109',
      company: 'Enterprise Systems',
      service: 'CLOUD_AI',
      message: 'Need cloud migration and AI integration services.',
      budget: '$75,000',
      status: 'QUALIFIED',
      createdAt: '2024-01-13T09:20:00Z'
    }
  ],
  bookings: [
    {
      id: '1',
      name: 'Sneha Reddy',
      email: 'sneha.r@corp.com',
      phone: '+91 9988776655',
      company: 'Corporate Solutions',
      serviceType: 'STAFF_AUGMENTATION',
      preferredDate: '2024-01-20T14:00:00Z',
      preferredTime: '14:00',
      timezone: 'IST',
      meetingType: 'VIDEO_CALL',
      status: 'SCHEDULED',
      meetingLink: 'https://meet.apexbridge.com/MT-123456'
    },
    {
      id: '2',
      name: 'Vikram Singh',
      email: 'vikram.s@business.in',
      phone: '+91 7654321098',
      company: 'Business Dynamics',
      serviceType: 'SALESFORCE',
      preferredDate: '2024-01-21T11:00:00Z',
      preferredTime: '11:00',
      timezone: 'IST',
      meetingType: 'PHONE_CALL',
      status: 'CONFIRMED',
      meetingLink: 'https://meet.apexbridge.com/MT-789012'
    }
  ],
  inquiries: [
    {
      id: '1',
      serviceType: 'STAFF_AUGMENTATION',
      requirements: '{"skills": ["React", "Node.js", "MongoDB"], "experience": "5+ years", "count": 3}',
      budget: '$60,000',
      timeline: '3 months',
      status: 'NEW',
      createdAt: '2024-01-15T11:00:00Z'
    },
    {
      id: '2',
      serviceType: 'CLOUD_AI',
      requirements: '{"services": ["AWS Migration", "ML Pipeline"], "timeline": "6 months"}',
      budget: '$120,000',
      timeline: '6 months',
      status: 'REVIEWING',
      createdAt: '2024-01-14T16:30:00Z'
    }
  ],
  jobApplications: [
    {
      id: '1',
      jobId: 101,
      jobTitle: 'Senior React Developer',
      firstName: 'Anjali',
      lastName: 'Verma',
      email: 'anjali.verma@email.com',
      phone: '+91 9876543210',
      location: 'Mumbai',
      experience: '5 years',
      currentSalary: '$15,00,000',
      expectedSalary: '$18,00,000',
      availability: '30 days',
      linkedin: 'linkedin.com/in/anjali-verma',
      github: 'github.com/anjali-verma',
      portfolio: 'anjali-portfolio.com',
      coverLetter: 'I am excited to apply for this position...',
      resume: 'resume_2024.pdf',
      howDidYouHear: 'LinkedIn',
      legalConsent: true,
      status: 'UNDER_REVIEW',
      createdAt: '2024-01-15T09:30:00Z'
    },
    {
      id: '2',
      jobId: 102,
      jobTitle: 'Salesforce Administrator',
      firstName: 'Rohit',
      lastName: 'Mehta',
      email: 'rohit.mehta@email.com',
      phone: '+91 9123456789',
      location: 'Pune',
      experience: '3 years',
      currentSalary: '$12,00,000',
      expectedSalary: '$14,00,000',
      availability: '15 days',
      linkedin: 'linkedin.com/in/rohit-mehta',
      github: '',
      portfolio: '',
      coverLetter: 'I have extensive experience in Salesforce...',
      resume: 'rohit_resume.pdf',
      howDidYouHear: 'Company Website',
      legalConsent: true,
      status: 'SHORTLISTED',
      createdAt: '2024-01-14T14:20:00Z'
    }
  ],
  chatSessions: [
    {
      id: 'session_123',
      startTime: '2024-01-15T10:00:00Z',
      endTime: null,
      status: 'active',
      messages: [
        {
          id: '1',
          text: 'Hello! Welcome to Apex Bridge Solutions. How can I help you today?',
          sender: 'bot',
          timestamp: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          text: 'I need information about your IT staff augmentation services.',
          sender: 'user',
          timestamp: '2024-01-15T10:01:00Z'
        },
        {
          id: '3',
          text: 'I\'d be happy to help! We provide skilled IT professionals on contract basis. What specific skills are you looking for?',
          sender: 'bot',
          timestamp: '2024-01-15T10:01:30Z'
        }
      ],
      userInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    },
    {
      id: 'session_124',
      startTime: '2024-01-15T09:30:00Z',
      endTime: '2024-01-15T09:45:00Z',
      status: 'completed',
      messages: [
        {
          id: '1',
          text: 'Hello! Welcome to Apex Bridge Solutions.',
          sender: 'bot',
          timestamp: '2024-01-15T09:30:00Z'
        },
        {
          id: '2',
          text: 'Do you have any Salesforce developer positions?',
          sender: 'user',
          timestamp: '2024-01-15T09:31:00Z'
        },
        {
          id: '3',
          text: 'Yes, we have several Salesforce positions available. Would you like me to send you the job descriptions?',
          sender: 'bot',
          timestamp: '2024-01-15T09:31:30Z'
        }
      ],
      userInfo: {
        name: 'Sarah Smith',
        email: 'sarah.smith@email.com'
      }
    }
  ]
}

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-purple-100 text-purple-800',
  CONVERTED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
  SCHEDULED: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REVIEWING: 'bg-orange-100 text-orange-800',
  UNDER_REVIEW: 'bg-orange-100 text-orange-800',
  SHORTLISTED: 'bg-emerald-100 text-emerald-800',
  active: 'bg-green-100 text-green-800',
  abandoned: 'bg-red-100 text-red-800'
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [realTimeChatData, setRealTimeChatData] = useState<any>({
    totalSessions: 0,
    activeSessions: 0,
    completedSessions: 0,
    abandonedSessions: 0,
    totalMessages: 0,
    averageResponseTime: 0,
    sessions: []
  })

  // Load real-time chat data from localStorage
  useEffect(() => {
    const loadChatData = () => {
      const storedData = localStorage.getItem('chatData')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setRealTimeChatData({
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
    }

    loadChatData()
    
    // Set up interval to refresh data every 2 seconds for real-time updates
    const interval = setInterval(loadChatData, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    // Reload all data including chat data
    const storedData = localStorage.getItem('chatData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setRealTimeChatData({
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
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  }

  const handleLogout = () => {
    // Clear any admin session data
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminUser')
    
    // Redirect to main page or login page
    window.location.href = '/'
  }

  const exportChatData = () => {
    const chatData = realTimeChatData.sessions
    if (chatData.length === 0) {
      alert('No chat data available to export')
      return
    }

    let exportText = 'APEX BRIDGE SOLUTIONS - CHAT SESSIONS REPORT\n'
    exportText += '=' .repeat(50) + '\n'
    exportText += `Generated: ${new Date().toLocaleString()}\n`
    exportText += `Total Sessions: ${chatData.length}\n\n`

    chatData.forEach((session: any, index: number) => {
      exportText += '=' .repeat(50) + '\n'
      exportText += `SESSION ID: ${session.id}\n`
      exportText += `Status: ${session.status?.toUpperCase()}\n`
      exportText += `Started: ${new Date(session.startTime).toLocaleString()}\n`
      if (session.endTime) {
        exportText += `Ended: ${new Date(session.endTime).toLocaleString()}\n`
      }
      exportText += `Duration: ${session.endTime ? 
        Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 60000) + ' minutes' : 
        'Still active'}\n`
      
      if (session.userInfo) {
        exportText += '\nUSER INFORMATION:\n'
        if (session.userInfo.name) exportText += `Name: ${session.userInfo.name}\n`
        if (session.userInfo.email) exportText += `Email: ${session.userInfo.email}\n`
        if (session.userInfo.phone) exportText += `Phone: ${session.userInfo.phone}\n`
      }
      
      exportText += '\nCONVERSATION:\n'
      exportText += '-'.repeat(30) + '\n'
      
      session.messages?.forEach((message: any) => {
        const time = new Date(message.timestamp).toLocaleTimeString()
        const sender = message.sender === 'user' ? 'USER' : 'BOT'
        exportText += `[${time}] ${sender}: ${message.text}\n`
      })
      
      exportText += '\n' + '=' .repeat(50) + '\n\n'
    })

    // Create and download file
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat_sessions_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const filteredData = (data: any[]) => {
    if (!searchTerm) return data
    return data.filter((item: any) => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={exportChatData}>
                <Download className="h-4 w-4 mr-2" />
                Export Chats
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="hover:bg-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'contacts', label: 'Contacts', icon: MessageSquare },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'inquiries', label: 'Inquiries', icon: Users },
              { id: 'applications', label: 'Job Applications', icon: Briefcase },
              { id: 'chats', label: 'Chat Sessions', icon: MessageCircle },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Contacts', value: mockData.stats.totalContacts, icon: MessageSquare, color: 'text-blue-600' },
                { label: 'Total Bookings', value: mockData.stats.totalBookings, icon: Calendar, color: 'text-green-600' },
                { label: 'Service Inquiries', value: mockData.stats.totalInquiries, icon: Users, color: 'text-purple-600' },
                { label: 'Job Applications', value: mockData.stats.totalJobApplications, icon: Briefcase, color: 'text-orange-600' }
              ].map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Chat Sessions', value: realTimeChatData.totalSessions, icon: MessageCircle, color: 'text-cyan-600' },
                { label: 'Active Chats', value: realTimeChatData.activeSessions, icon: Users, color: 'text-green-600' },
                { label: 'Total Messages', value: realTimeChatData.totalMessages, icon: MessageSquare, color: 'text-purple-600' }
              ].map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Contacts</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.contacts.slice(0, 3).map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <Badge className={statusColors[contact.status]}>
                          {contact.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Scheduled consultations and meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.name}</p>
                          <p className="text-sm text-muted-foreground">{new Date(booking.preferredDate).toLocaleDateString()}</p>
                        </div>
                        <Badge className={statusColors[booking.status]}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>All contact form submissions and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData(mockData.contacts).map((contact) => (
                    <div 
                      key={contact.id} 
                      className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(contact)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-foreground">{contact.name}</h3>
                            <Badge className={statusColors[contact.status]}>
                              {contact.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4" />
                              <span>{contact.company}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="mt-3 text-foreground">{contact.message}</p>
                          {contact.budget && (
                            <p className="mt-2 text-sm font-medium">Budget: {contact.budget}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Consultation Bookings</CardTitle>
                <CardDescription>All scheduled meetings and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData(mockData.bookings).map((booking) => (
                    <div 
                      key={booking.id} 
                      className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(booking)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-foreground">{booking.name}</h3>
                            <Badge className={statusColors[booking.status]}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{booking.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{booking.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(booking.preferredDate).toLocaleDateString()} at {booking.preferredTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{booking.timezone}</span>
                            </div>
                          </div>
                          {booking.meetingLink && (
                            <div className="mt-3">
                              <a 
                                href={booking.meetingLink} 
                                className="text-primary hover:underline text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join Meeting →
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Service Inquiries</CardTitle>
                <CardDescription>Detailed service inquiries and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.inquiries.map((inquiry) => (
                    <div 
                      key={inquiry.id} 
                      className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(inquiry)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-foreground">{inquiry.serviceType.replace('_', ' ')}</h3>
                            <Badge className={statusColors[inquiry.status]}>
                              {inquiry.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                            <div>Budget: {inquiry.budget}</div>
                            <div>Timeline: {inquiry.timeline}</div>
                            <div>Created: {new Date(inquiry.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div className="bg-muted/50 p-3 rounded">
                            <p className="text-sm font-medium mb-1">Requirements:</p>
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                              {JSON.stringify(JSON.parse(inquiry.requirements), null, 2)}
                            </pre>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Job Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>All job applications submitted through the website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData(mockData.jobApplications).map((application) => (
                    <div 
                      key={application.id} 
                      className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleItemClick(application)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-foreground">{application.firstName} {application.lastName}</h3>
                            <Badge className={statusColors[application.status]}>
                              {application.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{application.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{application.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-4 w-4" />
                              <span>{application.jobTitle}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4" />
                              <span>{application.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{application.experience}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4" />
                              <span>{application.expectedSalary}</span>
                            </div>
                          </div>
                          <div className="mt-3 text-sm text-muted-foreground">
                            <p><strong>Availability:</strong> {application.availability}</p>
                            <p><strong>Resume:</strong> {application.resume}</p>
                            {application.coverLetter && (
                              <p className="mt-2"><strong>Cover Letter:</strong> {application.coverLetter.substring(0, 100)}...</p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Chat Sessions Tab */}
        {activeTab === 'chats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Live Chat Sessions</CardTitle>
                <CardDescription>Real-time chatbot conversations (updates every 2 seconds)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realTimeChatData.sessions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No chat sessions yet. Start a chat on the website to see it here!</p>
                    </div>
                  ) : (
                    realTimeChatData.sessions.map((session) => (
                      <div 
                        key={session.id} 
                        className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleItemClick(session)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="font-semibold text-foreground">
                                Session #{session.id.split('_')[1]}
                                {session.status === 'active' && (
                                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                )}
                              </h3>
                              <Badge className={statusColors[session.status as keyof typeof statusColors]}>
                                {session.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Started: {new Date(session.startTime).toLocaleString()}</span>
                              </div>
                              {session.endTime && (
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>Ended: {new Date(session.endTime).toLocaleString()}</span>
                                </div>
                              )}
                              {session.userInfo && (
                                <>
                                  <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4" />
                                    <span>{session.userInfo.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{session.userInfo.email}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="mt-3">
                              <p className="text-sm font-medium mb-2">
                                Messages ({session.messages.length}):
                              </p>
                              <div className="space-y-1 max-h-32 overflow-y-auto">
                                {session.messages.slice(-5).map((message) => (
                                  <div key={message.id} className="text-xs text-muted-foreground border-l-2 pl-2" style={{
                                    borderColor: message.sender === 'user' ? '#3b82f6' : '#10b981'
                                  }}>
                                    <span className="font-medium">
                                      {message.sender === 'user' ? 'User' : 'Bot'}:
                                    </span> {message.text.substring(0, 60)}...
                                    <span className="text-xs opacity-60 ml-2">
                                      {new Date(message.timestamp).toLocaleTimeString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure your admin dashboard preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Email notifications for new contacts</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Email notifications for new bookings</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span>Daily summary reports</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                    <div className="flex space-x-4">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Data
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Details</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </Button>
            </div>
            <pre className="text-sm bg-muted p-4 rounded">
              {JSON.stringify(selectedItem, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
