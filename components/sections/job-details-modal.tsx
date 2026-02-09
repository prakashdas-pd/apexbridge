'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Briefcase, MapPin, Clock, DollarSign, Users, Calendar, Building, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
  responsibilities?: string[]
  benefits?: string[]
  skills?: string[]
  posted: string
  featured: boolean
}

interface JobDetailsModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
  onApply: () => void
}

export default function JobDetailsModal({ job, isOpen, onClose, onApply }: JobDetailsModalProps) {
  // Enhanced job data with additional details
  const enhancedJob = {
    ...job,
    responsibilities: job.responsibilities || [
      'Design and implement scalable solutions using modern technologies',
      'Collaborate with cross-functional teams to deliver high-quality projects',
      'Participate in code reviews and maintain best practices',
      'Troubleshoot and resolve technical issues',
      'Stay updated with industry trends and technologies'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and remote options',
      'Professional development and training opportunities',
      '401(k) retirement plan with company matching',
      'Generous paid time off and holidays',
      'Collaborative and inclusive work environment',
      'Career growth and advancement opportunities'
    ],
    skills: job.skills || [
      'Problem-solving and critical thinking',
      'Strong communication and teamwork skills',
      'Adaptability and quick learning ability',
      'Attention to detail and quality focus',
      'Time management and project organization'
    ]
  }

  if (!isOpen) return null

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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{job.title}</h2>
                      {job.featured && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{job.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Posted {job.posted}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="hover:bg-accent flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-8">
                  {/* Job Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Job Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="font-medium">{job.experience}</div>
                          <div className="text-sm text-muted-foreground">Experience Required</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="font-medium">{job.salary}</div>
                          <div className="text-sm text-muted-foreground">Salary Range</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="font-medium">Team</div>
                          <div className="text-sm text-muted-foreground">Collaborative Environment</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Key Responsibilities</h3>
                    <ul className="space-y-3">
                      {enhancedJob.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Requirements</h3>
                    <ul className="space-y-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills & Qualifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Skills & Qualifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {enhancedJob.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Benefits & Perks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {enhancedJob.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t bg-muted/30">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <div>Job ID: #{job.id.toString().padStart(4, '0')}</div>
                    <div>Department: {job.department}</div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={onApply} className="min-w-[140px]">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
