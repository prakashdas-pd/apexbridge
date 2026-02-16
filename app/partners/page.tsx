'use client'

import { motion } from 'framer-motion'
import { Handshake, Award, Users, Target, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const partners = [
  {
    name: 'Salesforce',
    logo: 'SF',
    description: 'Official Salesforce consulting partner with certified professionals and proven implementation expertise.',
    tier: ' platinum',
    color: 'bg-blue-500 text-white'
  },
  {
    name: 'Amazon Web Services',
    logo: 'AWS',
    description: 'AWS Partner Network member providing cloud infrastructure and migration services.',
    tier: ' gold',
    color: 'bg-orange-500 text-white'
  },
  {
    name: 'Microsoft Azure',
    logo: 'AZ',
    description: 'Microsoft Azure partner delivering cloud solutions and enterprise integration.',
    tier: ' gold',
    color: 'bg-blue-600 text-white'
  },
  {
    name: 'Google Cloud',
    logo: 'GCP',
    description: 'Google Cloud Partner specializing in data analytics and machine learning solutions.',
    tier: ' silver',
    color: 'bg-red-500 text-white'
  },
  {
    name: 'Oracle',
    logo: 'OR',
    description: 'Oracle PartnerNetwork member providing database and enterprise solutions.',
    tier: ' silver',
    color: 'bg-red-600 text-white'
  },
  {
    name: 'ServiceNow',
    logo: 'SN',
    description: 'ServiceNow partner delivering workflow automation and digital transformation.',
    tier: ' silver',
    color: 'bg-green-600 text-white'
  }
]

const partnershipBenefits = [
  {
    icon: Award,
    title: 'Certified Expertise',
    description: 'Our team holds certifications from all major technology partners, ensuring best practices and quality delivery.'
  },
  {
    icon: Users,
    title: 'Direct Support Access',
    description: 'Get priority support and direct access to partner resources for faster issue resolution.'
  },
  {
    icon: Target,
    title: 'Latest Technology',
    description: 'Early access to beta programs, new features, and cutting-edge technologies from our partners.'
  },
  {
    icon: Star,
    title: 'Proven Track Record',
    description: 'Successful implementations across multiple partner platforms with measurable business impact.'
  }
]

const partnershipStats = [
  { label: 'Technology Partners', value: '15+' },
  { label: 'Certified Professionals', value: '200+' },
  { label: 'Joint Implementations', value: '500+' },
  { label: 'Customer Satisfaction', value: '98%' }
]

export default function Partners() {
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
              <Handshake className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Our Trusted
              <span className="gradient-text"> Partners</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We collaborate with leading technology companies to deliver comprehensive solutions 
              that drive innovation and business success for our clients.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {partnershipStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
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
              Strategic Technology Alliances
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our partnerships enable us to deliver cutting-edge solutions with the latest technologies and best practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 ${partner.color} rounded-xl flex items-center justify-center text-2xl font-bold`}>
                        {partner.logo}
                      </div>
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full capitalize">
                        {partner.tier} Partner
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{partner.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
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
              Benefits of Our Partnerships
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our strategic alliances bring tangible benefits to our clients through enhanced capabilities and resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
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

      {/* Partnership Tiers */}
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
              Partnership Levels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain different levels of partnerships to ensure we can provide the right expertise for every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tier: 'Platinum',
                description: 'Highest level of partnership with dedicated resources and priority support.',
                features: ['Direct partner support', 'Early access to features', 'Joint marketing opportunities', 'Highest certification levels'],
                color: 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300'
              },
              {
                tier: 'Gold',
                description: 'Strong partnership with comprehensive support and collaboration benefits.',
                features: ['Priority support access', 'Training resources', 'Technical enablement', 'Customer success programs'],
                color: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
              },
              {
                tier: 'Silver',
                description: 'Established partnership providing core benefits and collaboration opportunities.',
                features: ['Standard support', 'Training materials', 'Community access', 'Basic certifications'],
                color: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
              }
            ].map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full hover:shadow-lg transition-shadow duration-300 ${level.color}`}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{level.tier}</h3>
                    <p className="text-muted-foreground mb-6">{level.description}</p>
                    <ul className="space-y-3">
                      {level.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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
              Become Our Partner
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Interested in partnering with Apex Bridge Solutions? Let's explore how we can create value together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Partnership Inquiries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
