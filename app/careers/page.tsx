'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign, Users, Star, Upload, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import JobApplicationForm from '@/components/sections/job-application-form'
import JobDetailsModal from '@/components/sections/job-details-modal'

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Salesforce Developer',
    department: 'Salesforce',
    type: 'Full-time',
    location: 'Remote',
    experience: '5+ years',
    salary: '$120k - $150k',
    description: 'We are looking for an experienced Salesforce Developer to join our team and work on enterprise-level implementations.',
    requirements: [
      '5+ years of Salesforce development experience',
      'Strong knowledge of Apex, Visualforce, and Lightning',
      'Salesforce Platform Developer I & II certification preferred',
      'Experience with integration patterns and APIs',
      'Excellent problem-solving skills'
    ],
    posted: '2 days ago',
    featured: true
  },
  {
    id: 2,
    title: 'Cloud DevOps Engineer',
    department: 'Cloud',
    type: 'Contract',
    location: 'San Francisco, CA',
    experience: '3+ years',
    salary: '$100k - $130k',
    description: 'Join our cloud team to help clients with infrastructure automation and cloud migration projects.',
    requirements: [
      '3+ years of DevOps experience',
      'Strong knowledge of AWS or Azure',
      'Experience with Docker and Kubernetes',
      'CI/CD pipeline implementation',
      'Infrastructure as Code (Terraform preferred)'
    ],
    posted: '1 week ago',
    featured: false
  },
  {
    id: 3,
    title: 'AI/ML Engineer',
    department: 'AI',
    type: 'Full-time',
    location: 'Remote',
    experience: '4+ years',
    salary: '$130k - $160k',
    description: 'We are seeking an AI/ML Engineer to develop and deploy machine learning models for various client projects.',
    requirements: [
      '4+ years of machine learning experience',
      'Proficiency in Python and ML frameworks',
      'Experience with deep learning and NLP',
      'Strong mathematical background',
      'Model deployment and MLOps experience'
    ],
    posted: '3 days ago',
    featured: true
  },
  {
    id: 4,
    title: 'Full-Stack Developer',
    department: 'Software',
    type: 'Contract-to-Hire',
    location: 'New York, NY',
    experience: '3+ years',
    salary: '$90k - $120k',
    description: 'Looking for a skilled Full-Stack Developer to work on modern web applications for our clients.',
    requirements: [
      '3+ years of full-stack development experience',
      'Strong knowledge of React and Node.js',
      'Experience with TypeScript',
      'Database design and optimization',
      'RESTful API development'
    ],
    posted: '5 days ago',
    featured: false
  },
  {
    id: 5,
    title: 'QA Automation Engineer',
    department: 'QA',
    type: 'Contract',
    location: 'Remote',
    experience: '2+ years',
    salary: '$70k - $90k',
    description: 'Join our QA team to ensure quality delivery of software products through automated testing.',
    requirements: [
      '2+ years of QA automation experience',
      'Experience with Selenium or Cypress',
      'Programming skills in Java or Python',
      'Test framework development',
      'Agile testing methodologies'
    ],
    posted: '1 week ago',
    featured: false
  }
]

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    description: 'Industry-leading salaries and performance-based bonuses.'
  },
  {
    icon: Users,
    title: 'Professional Growth',
    description: 'Continuous learning opportunities and career advancement paths.'
  },
  {
    icon: Briefcase,
    title: 'Flexible Work',
    description: 'Remote work options and flexible scheduling.'
  },
  {
    icon: Star,
    title: 'Great Culture',
    description: 'Collaborative environment with amazing team members.'
  }
]

const cultureValues = [
  {
    title: 'Innovation',
    description: 'We encourage creative thinking and embrace new technologies to solve complex problems.'
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from code quality to client relationships.'
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and diverse perspectives to achieve great results.'
  },
  {
    title: 'Growth',
    description: 'We support continuous learning and provide opportunities for personal and professional development.'
  }
]

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof jobOpenings[0] | null>(null)
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Join Our
              <span className="gradient-text"> Team</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Build your career with Apex Bridge Solutions. Work on exciting projects, 
              grow your skills, and make an impact with innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our current job openings and find the perfect opportunity to advance your career.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`hover:shadow-lg transition-shadow duration-300 ${job.featured ? 'border-primary' : ''}`}>
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {job.title}
                              {job.featured && (
                                <span className="ml-3 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  Featured
                                </span>
                              )}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.department}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {job.type}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Posted {job.posted}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-2">Key Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, reqIndex) => (
                              <li key={reqIndex} className="text-sm text-muted-foreground flex items-start">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 lg:ml-6">
                        <Button 
                          onClick={() => {
                            setSelectedJob(job)
                            setIsApplicationOpen(true)
                          }}
                        >
                          Apply Now
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job)
                            setIsDetailsOpen(true)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job - we provide a platform for growth, innovation, and success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Culture & Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We foster an inclusive environment where innovation thrives and everyone can contribute their best work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Join Our Talent Pool
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't see the right position? Submit your resume and we'll contact you when a suitable role opens up.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Send Us Your Resume
                </h3>
                <p className="text-muted-foreground mb-8">
                  We're always looking for talented professionals to join our team. 
                  Submit your resume and we'll keep you in mind for future opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="flex-1 sm:flex-initial">
                    <Mail className="mr-2 h-4 w-4" />
                    careers@apexbridgesolutions.com
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Job Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          job={selectedJob}
          isOpen={isApplicationOpen}
          onClose={() => {
            setIsApplicationOpen(false)
            setSelectedJob(null)
          }}
        />
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false)
            setSelectedJob(null)
          }}
          onApply={() => {
            setIsDetailsOpen(false)
            setIsApplicationOpen(true)
          }}
        />
      )}
    </div>
  )
}
