'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Cloud, Brain, Code, Shield, CheckCircle, Clock, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    icon: Users,
    title: 'IT Staff Augmentation',
    description: 'Skilled IT professionals on contract with flexible hiring options and quick joining resources.',
    features: [
      'Flexible hiring models (contract, contract-to-hire, full-time)',
      'Quick joining resources within 48-72 hours',
      'Pre-vetted professionals with proven expertise',
      'Cost-effective solutions with no long-term commitments',
      '24/7 support and dedicated account management'
    ],
    href: '/contact'
  },
  {
    icon: Cloud,
    title: 'Salesforce Services',
    description: 'Complete Salesforce setup, customization, support, and integration solutions for your business.',
    features: [
      'Salesforce setup and customization',
      'Sales Cloud and Service Cloud implementation',
      'Salesforce integration with third-party systems',
      'Ongoing support and maintenance',
      'Custom app development and automation'
    ],
    href: '/contact'
  },
  {
    icon: Brain,
    title: 'Cloud & AI Services',
    description: 'Cloud setup, management, AI automation, and intelligent chatbot solutions.',
    features: [
      'Cloud infrastructure setup and management',
      'Application hosting and migration services',
      'AI-powered automation and process optimization',
      'Custom chatbot development and deployment',
      'Data analytics and business intelligence solutions'
    ],
    href: '/contact'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Quick Deployment',
    description: 'Get skilled professionals on board within 48-72 hours, ensuring your projects never face delays.'
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous screening process with technical assessments and background checks.'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Easily scale your team up or down based on project requirements and business needs.'
  },
  {
    icon: Award,
    title: 'Expert Support',
    description: 'Dedicated account managers and 24/7 technical support for seamless collaboration.'
  }
]

const process = [
  {
    step: '01',
    title: 'Requirement Analysis',
    description: 'We understand your specific needs, project requirements, and team dynamics to find the perfect match.'
  },
  {
    step: '02',
    title: 'Talent Sourcing',
    description: 'Our expert team sources and screens candidates from our extensive network of IT professionals.'
  },
  {
    step: '03',
    title: 'Interview & Selection',
    description: 'You interview shortlisted candidates and select the best fit for your team and project.'
  },
  {
    step: '04',
    title: 'Onboarding & Support',
    description: 'We handle the onboarding process and provide ongoing support throughout the engagement.'
  }
]

export default function Services() {
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
              Our
              <span className="gradient-text"> Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive IT solutions designed to accelerate your business growth. 
              From staff augmentation to cutting-edge AI services, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-4">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={service.href}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
              Why Choose Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional value through our commitment to quality, innovation, and client success.
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

      {/* Process Section */}
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
              Our Simple Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From understanding your needs to deploying the right talent, we make the process seamless and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our services can help you achieve your business goals and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/roles">View Available Roles</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
