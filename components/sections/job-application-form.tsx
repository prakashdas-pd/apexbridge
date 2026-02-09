'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Briefcase, MapPin, Clock, DollarSign, CheckCircle, AlertCircle, User, Mail, Phone, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface JobApplicationData {
  jobId: number
  jobTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  experience: string
  currentSalary: string
  expectedSalary: string
  availability: string
  linkedin: string
  github: string
  portfolio: string
  coverLetter: string
  resume: File | null
  howDidYouHear: string
  legalConsent: boolean
}

interface Job {
  id: number
  title: string
  department: string
  type: string
  location: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  posted: string
  featured: boolean
}

interface JobApplicationFormProps {
  job: Job
  isOpen: boolean
  onClose: () => void
}

export default function JobApplicationForm({ job, isOpen, onClose }: JobApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<JobApplicationData>({
    jobId: job.id,
    jobTitle: job.title,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    currentSalary: '',
    expectedSalary: '',
    availability: '',
    linkedin: '',
    github: '',
    portfolio: '',
    coverLetter: '',
    resume: null,
    howDidYouHear: '',
    legalConsent: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof JobApplicationData, value: string | File | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.location.trim()) newErrors.location = 'Location is required'
        break
      case 2:
        if (!formData.experience.trim()) newErrors.experience = 'Experience is required'
        if (!formData.availability.trim()) newErrors.availability = 'Availability is required'
        if (!formData.resume) newErrors.resume = 'Resume is required'
        break
      case 3:
        if (!formData.legalConsent) newErrors.legalConsent = 'You must agree to the terms'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resume: 'File size must be less than 5MB' })
        return
      }
      if (!file.type.includes('pdf') && !file.type.includes('document')) {
        setErrors({ ...errors, resume: 'Please upload a PDF or Word document' })
        return
      }
      handleInputChange('resume', file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Job application submitted:', formData)
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
      setCurrentStep(1)
      setFormData({
        jobId: job.id,
        jobTitle: job.title,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        currentSalary: '',
        expectedSalary: '',
        availability: '',
        linkedin: '',
        github: '',
        portfolio: '',
        coverLetter: '',
        resume: null,
        howDidYouHear: '',
        legalConsent: false
      })
    }, 3000)
  }

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Professional', icon: Briefcase },
    { title: 'Review', icon: CheckCircle }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Apply for {job.title}</h2>
                    <p className="text-muted-foreground">{job.department} • {job.type} • {job.location}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="hover:bg-accent"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        index + 1 <= currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                      </div>
                      <div className="ml-3">
                        <div className={`text-sm font-medium ${
                          index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-4 ${
                          index < currentStep - 1 ? 'bg-primary' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
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
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              First Name *
                            </label>
                            <Input
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              placeholder="John"
                              className={errors.firstName ? 'border-red-500' : ''}
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Last Name *
                            </label>
                            <Input
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              placeholder="Doe"
                              className={errors.lastName ? 'border-red-500' : ''}
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="john@example.com"
                              className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Phone Number *
                            </label>
                            <Input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              className={errors.phone ? 'border-red-500' : ''}
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Location *
                            </label>
                            <Input
                              value={formData.location}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                              placeholder="San Francisco, CA"
                              className={errors.location ? 'border-red-500' : ''}
                            />
                            {errors.location && (
                              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                            )}
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
                        <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Years of Experience *
                            </label>
                            <select
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              className={`w-full p-3 border rounded-md bg-background ${errors.experience ? 'border-red-500' : ''}`}
                            >
                              <option value="">Select experience</option>
                              <option value="0-2">0-2 years</option>
                              <option value="2-5">2-5 years</option>
                              <option value="5-10">5-10 years</option>
                              <option value="10+">10+ years</option>
                            </select>
                            {errors.experience && (
                              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Current Salary (Optional)
                              </label>
                              <Input
                                value={formData.currentSalary}
                                onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                                placeholder="$80,000"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Expected Salary
                              </label>
                              <Input
                                value={formData.expectedSalary}
                                onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                                placeholder="$100,000"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Availability *
                            </label>
                            <select
                              value={formData.availability}
                              onChange={(e) => handleInputChange('availability', e.target.value)}
                              className={`w-full p-3 border rounded-md bg-background ${errors.availability ? 'border-red-500' : ''}`}
                            >
                              <option value="">Select availability</option>
                              <option value="Immediately">Immediately</option>
                              <option value="2 weeks">2 weeks</option>
                              <option value="1 month">1 month</option>
                              <option value="2 months">2 months</option>
                              <option value="3+ months">3+ months</option>
                            </select>
                            {errors.availability && (
                              <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                LinkedIn Profile
                              </label>
                              <Input
                                value={formData.linkedin}
                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                placeholder="linkedin.com/in/johndoe"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                GitHub Profile
                              </label>
                              <Input
                                value={formData.github}
                                onChange={(e) => handleInputChange('github', e.target.value)}
                                placeholder="github.com/johndoe"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Portfolio Website
                              </label>
                              <Input
                                value={formData.portfolio}
                                onChange={(e) => handleInputChange('portfolio', e.target.value)}
                                placeholder="johndoe.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Resume/CV *
                            </label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <div className="text-sm text-muted-foreground mb-2">
                                {formData.resume ? formData.resume.name : 'Upload your resume (PDF or Word, max 5MB)'}
                              </div>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="resume-upload"
                              />
                              <Button
                                variant="outline"
                                onClick={() => document.getElementById('resume-upload')?.click()}
                                className="mt-2"
                              >
                                Choose File
                              </Button>
                            </div>
                            {errors.resume && (
                              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Cover Letter
                            </label>
                            <Textarea
                              value={formData.coverLetter}
                              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                              placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                              rows={4}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              How did you hear about this position?
                            </label>
                            <select
                              value={formData.howDidYouHear}
                              onChange={(e) => handleInputChange('howDidYouHear', e.target.value)}
                              className="w-full p-3 border rounded-md bg-background"
                            >
                              <option value="">Select an option</option>
                              <option value="LinkedIn">LinkedIn</option>
                              <option value="Indeed">Indeed</option>
                              <option value="Company Website">Company Website</option>
                              <option value="Referral">Referral</option>
                              <option value="Other">Other</option>
                            </select>
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
                        <h3 className="text-lg font-semibold mb-4">Review Your Application</h3>
                        
                        {/* Application Summary */}
                        <Card className="mb-6">
                          <CardHeader>
                            <CardTitle className="text-lg">Application Summary</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm text-muted-foreground">Name:</span>
                                <div className="font-medium">{formData.firstName} {formData.lastName}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Email:</span>
                                <div className="font-medium">{formData.email}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Phone:</span>
                                <div className="font-medium">{formData.phone}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Location:</span>
                                <div className="font-medium">{formData.location}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Experience:</span>
                                <div className="font-medium">{formData.experience}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Availability:</span>
                                <div className="font-medium">{formData.availability}</div>
                              </div>
                            </div>
                            
                            <div className="border-t pt-4">
                              <div className="mb-4">
                                <span className="text-sm text-muted-foreground">Resume:</span>
                                <div className="font-medium">{formData.resume?.name || 'Not uploaded'}</div>
                              </div>
                              
                              {formData.coverLetter && (
                                <div>
                                  <span className="text-sm text-muted-foreground">Cover Letter:</span>
                                  <div className="font-medium text-sm mt-1 line-clamp-3">
                                    {formData.coverLetter}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Legal Consent */}
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.legalConsent}
                                  onChange={(e) => handleInputChange('legalConsent', e.target.checked)}
                                  className="mt-1"
                                />
                                <span className="text-sm text-muted-foreground">
                                  I certify that the information provided in this application is true and complete. 
                                  I understand that any false information may lead to the rejection of my application 
                                  or termination of employment if discovered later.
                                </span>
                              </label>
                              {errors.legalConsent && (
                                <p className="text-red-500 text-sm">{errors.legalConsent}</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
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
                    <Button onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
