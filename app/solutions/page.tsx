'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Brain, Shield, Users, Cog, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const solutions = [
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Modernize your infrastructure with cutting-edge technology solutions that drive efficiency and innovation.',
    icon: Cloud,
    features: [
      'Legacy system modernization',
      'Digital workflow automation',
      'API integration and development',
      'Data architecture redesign',
      'Performance optimization'
    ],
    benefits: [
      'Increased operational efficiency by 40%',
      'Reduced maintenance costs',
      'Enhanced user experience',
      'Scalable infrastructure'
    ],
    caseStudy: {
      company: 'Fortune 500 Retail Chain',
      challenge: 'Outdated POS systems causing 30% downtime',
      solution: 'Complete digital transformation with cloud-based solutions',
      result: '99.9% uptime, 45% cost reduction'
    }
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration',
    description: 'Seamless migration to cloud platforms with zero downtime and enhanced security.',
    icon: Cloud,
    features: [
      'AWS/Azure/GCP migration',
      'Hybrid cloud solutions',
      'Data transfer and synchronization',
      'Security and compliance setup',
      '24/7 monitoring and support'
    ],
    benefits: [
      'Zero downtime migration',
      'Cost optimization up to 60%',
      'Enhanced data security',
      'Improved scalability'
    ],
    caseStudy: {
      company: 'Healthcare Provider',
      challenge: 'On-premise servers at capacity',
      solution: 'Migrated to HIPAA-compliant cloud infrastructure',
      result: '70% cost reduction, improved patient data access'
    }
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Implement AI-powered solutions to enhance business intelligence and automation.',
    icon: Brain,
    features: [
      'Machine learning models',
      'Natural language processing',
      'Predictive analytics',
      'Computer vision solutions',
      'AI-powered chatbots'
    ],
    benefits: [
      'Automated decision making',
      'Enhanced customer insights',
      'Reduced manual work',
      'Competitive advantage'
    ],
    caseStudy: {
      company: 'E-commerce Platform',
      challenge: 'Manual product categorization was inefficient',
      solution: 'AI-powered automated categorization system',
      result: '90% accuracy, 200 hours saved weekly'
    }
  },
  {
    id: 'salesforce',
    title: 'Salesforce Solutions',
    description: 'Custom Salesforce implementations and optimizations to maximize your CRM investment.',
    icon: Shield,
    features: [
      'Salesforce implementation',
      'Custom app development',
      'Integration with third-party systems',
      'Data migration and cleanup',
      'User training and support'
    ],
    benefits: [
      'Improved sales productivity',
      'Better customer insights',
      'Streamlined processes',
      'Higher user adoption'
    ],
    caseStudy: {
      company: 'Manufacturing Company',
      challenge: 'Disconnected sales and customer service teams',
      solution: 'Unified Salesforce implementation with custom integrations',
      result: '35% increase in sales, 50% faster response times'
    }
  },
  {
    id: 'staff-augmentation',
    title: 'Staff Augmentation',
    description: 'Flexible IT talent acquisition and management solutions for your project needs.',
    icon: Users,
    features: [
      'On-demand IT professionals',
      'Specialized skill matching',
      'Rapid onboarding (48-72 hours)',
      'Flexible engagement models',
      'Performance monitoring'
    ],
    benefits: [
      'Quick access to talent',
      'Cost-effective staffing',
      'Reduced hiring time',
      'Expertise on demand'
    ],
    caseStudy: {
      company: 'Tech Startup',
      challenge: 'Needed specialized developers quickly',
      solution: 'Provided 5 senior developers within 72 hours',
      result: 'Product launched 2 months ahead of schedule'
    }
  },
  {
    id: 'automation',
    title: 'Process Automation',
    description: 'Automate repetitive tasks to boost productivity and reduce human error.',
    icon: Cog,
    features: [
      'Workflow automation',
      'RPA implementation',
      'Integration platform setup',
      'Custom automation scripts',
      'Process optimization'
    ],
    benefits: [
      'Reduced manual errors',
      'Faster processing times',
      'Cost savings',
      'Employee satisfaction'
    ],
    caseStudy: {
      company: 'Financial Services Firm',
      challenge: 'Manual report generation took 40 hours weekly',
      solution: 'Automated reporting system with real-time dashboards',
      result: '95% time reduction, improved data accuracy'
    }
  }
]

export default function Solutions() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your business with our comprehensive IT solutions designed to drive growth, 
              efficiency, and innovation in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <solution.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{solution.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4 leading-relaxed">
                      {solution.description}
                    </CardDescription>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {solution.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {solution.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-muted-foreground flex items-center">
                              <TrendingUp className="h-3 w-3 text-green-500 mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={`/solutions/${solution.id}`} className="flex items-center justify-center">
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
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
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real clients who transformed their business with our solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.slice(0, 4).map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <solution.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {solution.caseStudy.company}
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground">Challenge:</h4>
                          <p className="text-sm text-muted-foreground">{solution.caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">Solution:</h4>
                          <p className="text-sm text-muted-foreground">{solution.caseStudy.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">Result:</h4>
                          <p className="text-sm text-green-600 font-medium">{solution.caseStudy.result}</p>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our solutions can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
