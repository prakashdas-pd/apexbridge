'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, X, Video, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface BookingData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  date: string
  time: string
  meetingType: string
  message: string
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

const services = [
  'IT Staff Augmentation',
  'Salesforce Consulting',
  'Cloud Solutions',
  'AI & Machine Learning',
  'Custom Software Development',
  'General Consultation'
]

const meetingTypes = [
  { value: 'video', label: 'Video Call', icon: Video },
  { value: 'phone', label: 'Phone Call', icon: Phone },
  { value: 'inperson', label: 'In-Person Meeting', icon: MapPin }
]

export default function BookingSystem() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    date: '',
    time: '',
    meetingType: 'video',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setIsBookingOpen(false)
      setCurrentStep(1)
      setBookingData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        date: '',
        time: '',
        meetingType: 'video',
        message: ''
      })
    }, 3000)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.name && bookingData.email && bookingData.phone
      case 2:
        return bookingData.service && bookingData.date && bookingData.time
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <>
      {/* Booking Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <Button
          size="lg"
          onClick={() => setIsBookingOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 text-white group"
        >
          <Calendar className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Schedule a Consultation</h2>
                      <p className="text-muted-foreground">Book a meeting with our experts</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsBookingOpen(false)}
                      className="hover:bg-accent"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mt-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= currentStep
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                        </div>
                        {step < 3 && (
                          <div className={`w-16 h-1 mx-2 ${
                            step < currentStep ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Full Name *
                              </label>
                              <Input
                                value={bookingData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Email Address *
                              </label>
                              <Input
                                type="email"
                                value={bookingData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="john@example.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Phone Number *
                              </label>
                              <Input
                                type="tel"
                                value={bookingData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Company
                              </label>
                              <Input
                                value={bookingData.company}
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                placeholder="Acme Corp"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Service & Schedule</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Service Type *
                              </label>
                              <select
                                value={bookingData.service}
                                onChange={(e) => handleInputChange('service', e.target.value)}
                                className="w-full p-3 border rounded-md bg-background"
                              >
                                <option value="">Select a service</option>
                                {services.map(service => (
                                  <option key={service} value={service}>{service}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Preferred Date *
                                </label>
                                <Input
                                  type="date"
                                  value={bookingData.date}
                                  onChange={(e) => handleInputChange('date', e.target.value)}
                                  min={new Date().toISOString().split('T')[0]}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Preferred Time *
                                </label>
                                <select
                                  value={bookingData.time}
                                  onChange={(e) => handleInputChange('time', e.target.value)}
                                  className="w-full p-3 border rounded-md bg-background"
                                >
                                  <option value="">Select time</option>
                                  {timeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Meeting Type
                              </label>
                              <div className="grid grid-cols-3 gap-4">
                                {meetingTypes.map(type => (
                                  <button
                                    key={type.value}
                                    onClick={() => handleInputChange('meetingType', type.value)}
                                    className={`p-3 rounded-lg border-2 transition-all ${
                                      bookingData.meetingType === type.value
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                                  >
                                    <type.icon className="h-5 w-5 mx-auto mb-2" />
                                    <div className="text-sm">{type.label}</div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Message (Optional)
                            </label>
                            <Textarea
                              value={bookingData.message}
                              onChange={(e) => handleInputChange('message', e.target.value)}
                              placeholder="Tell us about your project or requirements..."
                              rows={4}
                            />
                          </div>
                        </div>

                        {/* Summary */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Booking Summary</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Name:</span>
                                <div className="font-medium">{bookingData.name}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Email:</span>
                                <div className="font-medium">{bookingData.email}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Service:</span>
                                <div className="font-medium">{bookingData.service}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Date & Time:</span>
                                <div className="font-medium">{bookingData.date} at {bookingData.time}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-muted/30">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button onClick={nextStep} disabled={!isStepValid()}>
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={isSubmitting || !isStepValid()}>
                        {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-6">
                Your consultation has been scheduled. We'll send you a confirmation email shortly.
              </p>
              <div className="text-sm text-muted-foreground">
                <div className="mb-2">
                  <strong>Date:</strong> {bookingData.date} at {bookingData.time}
                </div>
                <div>
                  <strong>Meeting Type:</strong> {meetingTypes.find(t => t.value === bookingData.meetingType)?.label}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
