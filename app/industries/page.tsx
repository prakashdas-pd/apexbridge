'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, GraduationCap, DollarSign, ShoppingCart, Building, Users, CheckCircle, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const industries = [
  {
    id: 'insurance',
    icon: Shield,
    title: 'Insurance',
    description: 'Specialized IT solutions for the insurance industry, from policy management systems to claims processing automation.',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    services: [
      'Policy Management Systems',
      'Claims Processing Automation',
      'Risk Assessment Tools',
      'Customer Relationship Management',
      'Regulatory Compliance Solutions',
      'Data Analytics & Reporting'
    ],
    challenges: [
      'Legacy system modernization',
      'Regulatory compliance',
      'Data security and privacy',
      'Customer experience enhancement'
    ]
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare',
    description: 'Healthcare technology solutions including EHR systems, telemedicine platforms, and healthcare analytics.',
    color: 'bg-green-50 text-green-600 border-green-200',
    services: [
      'Electronic Health Records (EHR)',
      'Telemedicine Platforms',
      'Healthcare Analytics',
      'Patient Management Systems',
      'Medical Billing Solutions',
      'HIPAA Compliance Systems'
    ],
    challenges: [
      'HIPAA compliance',
      'Interoperability',
      'Patient data security',
      'Workflow optimization'
    ]
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    description: 'Educational technology solutions for learning management, student information systems, and online learning platforms.',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    services: [
      'Learning Management Systems',
      'Student Information Systems',
      'Online Assessment Platforms',
      'Virtual Classroom Solutions',
      'Educational Analytics',
      'Content Management Systems'
    ],
    challenges: [
      'Scalability for peak usage',
      'User experience for diverse learners',
      'Data integration across systems',
      'Accessibility compliance'
    ]
  },
  {
    id: 'banking',
    icon: DollarSign,
    title: 'Banking & Finance',
    description: 'Financial technology solutions including banking systems, payment processing, and regulatory compliance platforms.',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    services: [
      'Core Banking Systems',
      'Payment Processing Solutions',
      'Risk Management Platforms',
      'Fraud Detection Systems',
      'Digital Banking Platforms',
      'Regulatory Compliance Tools'
    ],
    challenges: [
      'Security and fraud prevention',
      'Regulatory compliance',
      'System integration',
      'Customer experience modernization'
    ]
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail',
    description: 'Retail technology solutions including e-commerce platforms, inventory management, and customer loyalty systems.',
    color: 'bg-red-50 text-red-600 border-red-200',
    services: [
      'E-commerce Platforms',
      'Inventory Management Systems',
      'Customer Relationship Management',
      'Point of Sale (POS) Solutions',
      'Supply Chain Management',
      'Analytics & Business Intelligence'
    ],
    challenges: [
      'Omnichannel integration',
      'Inventory optimization',
      'Customer personalization',
      'Supply chain visibility'
    ]
  }
]

const stats = [
  { label: 'Industries Served', value: '5+', icon: Building },
  { label: 'Industry-Specific Solutions', value: '30+', icon: CheckCircle },
  { label: 'Years of Domain Expertise', value: '10+', icon: TrendingUp },
  { label: 'Industry Experts', value: '200+', icon: Users }
]

export default function Industries() {
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
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Industries We
              <span className="gradient-text"> Serve</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Specialized IT solutions tailored to the unique challenges and opportunities 
              of your industry. We bring deep domain expertise and proven success across multiple sectors.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="scroll-mt-20"
                id={industry.id}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-8 lg:p-12">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${industry.color}`}>
                        <industry.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        {industry.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {industry.description}
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Our Solutions:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {industry.services.map((service, serviceIndex) => (
                              <div key={serviceIndex} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{service}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Common Challenges We Solve:</h4>
                          <div className="space-y-2">
                            {industry.challenges.map((challenge, challengeIndex) => (
                              <div key={challengeIndex} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{challenge}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-8 lg:p-12 flex items-center">
                      <div className="w-full">
                        <h4 className="font-semibold text-foreground mb-6">Industry Expertise</h4>
                        <div className="space-y-4">
                          <div className="bg-background rounded-lg p-4 border">
                            <h5 className="font-medium text-foreground mb-2">Domain Knowledge</h5>
                            <p className="text-sm text-muted-foreground">
                              Deep understanding of {industry.title.toLowerCase()} industry processes, 
                              regulations, and best practices.
                            </p>
                          </div>
                          <div className="bg-background rounded-lg p-4 border">
                            <h5 className="font-medium text-foreground mb-2">Proven Solutions</h5>
                            <p className="text-sm text-muted-foreground">
                              Successfully delivered projects for leading {industry.title.toLowerCase()} 
                              companies with measurable results.
                            </p>
                          </div>
                          <div className="bg-background rounded-lg p-4 border">
                            <h5 className="font-medium text-foreground mb-2">Specialized Talent</h5>
                            <p className="text-sm text-muted-foreground">
                              Access to IT professionals with specific {industry.title.toLowerCase()} 
                              industry experience and certifications.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
              Why Industry Leaders Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine deep industry expertise with cutting-edge technology to deliver solutions that drive real business value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Industry-Specific Expertise',
                description: 'Our consultants and developers have deep domain knowledge and hands-on experience in your industry.',
                icon: Users
              },
              {
                title: 'Regulatory Compliance',
                description: 'We ensure all solutions meet industry-specific regulations and compliance requirements.',
                icon: Shield
              },
              {
                title: 'Scalable Solutions',
                description: 'Our solutions grow with your business, adapting to changing industry demands and technologies.',
                icon: TrendingUp
              },
              {
                title: 'Proven Track Record',
                description: 'Successful implementations across multiple industries with measurable business impact.',
                icon: CheckCircle
              },
              {
                title: 'Quick Time-to-Value',
                description: 'Rapid deployment and implementation to ensure you see results quickly.',
                icon: ArrowRight
              },
              {
                title: 'Ongoing Support',
                description: 'Continuous support and maintenance to ensure optimal performance and compliance.',
                icon: Users
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Transform Your Industry with Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our industry-specific solutions can help you overcome challenges and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
