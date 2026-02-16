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
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Filter,
  Search,
  Download,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Mock data - in production, this would come from API
const mockData = {
  stats: {
    totalContacts: 156,
    totalBookings: 89,
    totalInquiries: 234,
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
  ]
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-green-100 text-green-800',
  CONVERTED: 'bg-purple-100 text-purple-800',
  CLOSED: 'bg-gray-100 text-gray-800',
  SCHEDULED: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-purple-100 text-purple-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REVIEWING: 'bg-orange-100 text-orange-800'
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const filteredData = (data) => {
    if (!searchTerm) return data
    return data.filter(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
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
                { label: 'Active Users', value: mockData.stats.activeUsers, icon: TrendingUp, color: 'text-orange-600' }
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

        {/* Settings Tab */}
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
                <XCircle className="h-4 w-4" />
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
