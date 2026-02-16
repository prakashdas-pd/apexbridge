'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Cloud, Brain, Code, Shield, CheckCircle, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TestimonialSlider from '@/components/sections/testimonial-slider'
import BookingSystem from '@/components/sections/booking-system'

const services = [
  {
    icon: Users,
    title: 'IT Staff Augmentation',
    description: 'Skilled IT professionals on contract with flexible hiring options and quick joining resources.',
    href: '/services',
    keyFeatures: [
      'Flexible hiring models',
      'Quick joining resources',
      'Skilled IT professionals',
      'Cost-effective solutions'
    ]
  },
  {
    icon: Cloud,
    title: 'Salesforce Services',
    description: 'Complete Salesforce setup, customization, support, and integration solutions for your business.',
    href: '/services#salesforce',
    keyFeatures: [
      'Custom Salesforce setup',
      'Integration with 3rd parties',
      'Ongoing support and maintenance',
      'Custom app development'
    ]
  },
  {
    icon: Brain,
    title: 'Cloud & AI Services',
    description: 'Cloud setup, management, AI automation, and intelligent chatbot solutions.',
    href: '/services#cloud-ai',
    keyFeatures: [
      'Cloud infrastructure setup',
      'AI automation solutions',
      'Intelligent chatbots',
      'Data analytics platforms'
    ]
  }
]

const stats = [
  { label: 'Happy Clients', value: '500+', icon: Star },
  { label: 'IT Professionals', value: '1000+', icon: Users },
  { label: 'Projects Completed', value: '2000+', icon: CheckCircle },
  { label: 'Years of Experience', value: '10+', icon: TrendingUp }
]

const roles = [
  'Salesforce Developers / Admins',
  'Cloud Engineers',
  'AI Engineers',
  'Software Developers',
  'QA & Support Engineers'
]

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Light overlay for better text readability */}
          <div className="absolute inset-0 " />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold  text-white mb-6 leading-tight">
                Connecting Top
                <span className="gradient-text"> IT Talent</span>
                <br />
                with Leading Companies
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Apex Bridge Solutions is your trusted partner for IT staff augmentation, 
                Salesforce solutions, and cutting-edge cloud & AI services. We connect 
                exceptional talent with innovative companies worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We Provide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive IT solutions tailored to your business needs, from staff augmentation to cutting-edge AI services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {service.description}
                    </CardDescription>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.keyFeatures.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="ghost" asChild className="p-0 h-auto">
                      <Link href={service.href} className="flex items-center text-primary hover:underline">
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
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
              Why Clients Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver excellence through our commitment to quality, innovation, and client success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  title: 'Expert Talent Pool',
                  description: 'Access to 1000+ pre-vetted IT professionals with diverse skills and experience.',
                  icon: Users
                },
                {
                  title: 'Quick Deployment',
                  description: 'Rapid onboarding process with resources joining within 48-72 hours.',
                  icon: TrendingUp
                },
                {
                  title: 'Flexible Engagement',
                  description: 'Customizable hiring models from contract-to-hire to long-term partnerships.',
                  icon: Shield
                },
                {
                  title: 'Quality Assurance',
                  description: 'Rigorous screening process ensuring only the best talent for your projects.',
                  icon: CheckCircle
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">Roles We Provide</CardTitle>
                  <CardDescription>
                    Expert professionals across all major IT domains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roles.map((role, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{role}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button asChild>
                      <Link href="/roles">View All Roles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialSlider />
      </section>

      
      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your IT Team?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how Apex Bridge Solutions can help you achieve your business goals with our exceptional IT talent and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/careers">Join Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
