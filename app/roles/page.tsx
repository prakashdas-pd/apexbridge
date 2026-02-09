'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Cloud, Brain, Code, Shield, CheckCircle, Star, Briefcase, Zap, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const roleCategories = [
  {
    id: 'salesforce',
    icon: Database,
    title: 'Salesforce Developers / Admins',
    description: 'Expert Salesforce professionals for implementation, customization, and optimization.',
    roles: [
      {
        title: 'Salesforce Developer',
        description: 'Apex, Visualforce, Lightning development, and custom application development.',
        skills: ['Apex Programming', 'Lightning Web Components', 'Visualforce', 'Integration APIs']
      },
      {
        title: 'Salesforce Administrator',
        description: 'System configuration, user management, and ongoing Salesforce platform maintenance.',
        skills: ['Sales Cloud', 'Service Cloud', 'Process Builder', 'Flow Builder', 'Reports & Dashboards']
      },
      {
        title: 'Salesforce Architect',
        description: 'Enterprise-level solution design and technical architecture for complex implementations.',
        skills: ['Solution Design', 'Data Modeling', 'Integration Patterns', 'Security Architecture']
      }
    ]
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Engineers',
    description: 'Skilled cloud professionals for infrastructure, deployment, and management.',
    roles: [
      {
        title: 'AWS Cloud Engineer',
        description: 'AWS infrastructure management, deployment automation, and cloud optimization.',
        skills: ['EC2', 'S3', 'Lambda', 'CloudFormation', 'Terraform']
      },
      {
        title: 'Azure Cloud Engineer',
        description: 'Microsoft Azure platform management and hybrid cloud solutions.',
        skills: ['Azure VM', 'Azure Functions', 'DevOps', 'ARM Templates']
      },
      {
        title: 'DevOps Engineer',
        description: 'CI/CD pipeline setup, infrastructure as code, and deployment automation.',
        skills: ['Jenkins', 'Docker', 'Kubernetes', 'GitOps', 'Monitoring']
      }
    ]
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Engineers',
    description: 'Cutting-edge AI professionals for machine learning and automation solutions.',
    roles: [
      {
        title: 'Machine Learning Engineer',
        description: 'ML model development, training, and deployment for business applications.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'ML Ops']
      },
      {
        title: 'AI/ML Researcher',
        description: 'Advanced AI research and development for innovative solutions.',
        skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Research Methodology']
      },
      {
        title: 'Chatbot Developer',
        description: 'AI-powered chatbot development and conversational AI solutions.',
        skills: ['NLP', 'Dialogflow', 'Rasa', 'Bot Framework', 'Voice AI']
      }
    ]
  },
  {
    id: 'software',
    icon: Code,
    title: 'Software Developers',
    description: 'Full-stack and specialized developers for various technology stacks.',
    roles: [
      {
        title: 'Full-Stack Developer',
        description: 'End-to-end web application development with modern frameworks.',
        skills: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Databases']
      },
      {
        title: 'Mobile Developer',
        description: 'Native and cross-platform mobile application development.',
        skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX']
      },
      {
        title: 'Backend Developer',
        description: 'Server-side development, API design, and database architecture.',
        skills: ['Java', 'Python', 'Node.js', 'Microservices', 'SQL/NoSQL']
      }
    ]
  },
  {
    id: 'qa',
    icon: Shield,
    title: 'QA & Support Engineers',
    description: 'Quality assurance and technical support professionals.',
    roles: [
      {
        title: 'QA Engineer',
        description: 'Manual and automated testing to ensure software quality and reliability.',
        skills: ['Selenium', 'Cypress', 'Test Planning', 'Agile Testing', 'Performance Testing']
      },
      {
        title: 'Technical Support Engineer',
        description: 'Customer support and technical issue resolution for enterprise clients.',
        skills: ['Troubleshooting', 'Customer Service', 'Technical Documentation', 'SLA Management']
      },
      {
        title: 'DevTest Engineer',
        description: 'Test automation framework development and continuous testing integration.',
        skills: ['Test Automation', 'CI/CD', 'Performance Testing', 'Security Testing']
      }
    ]
  }
]

const benefits = [
  {
    icon: Star,
    title: 'Pre-Vetted Talent',
    description: 'All professionals undergo rigorous technical and background screening.'
  },
  {
    icon: Zap,
    title: 'Quick Onboarding',
    description: 'Get the right talent on board within 48-72 hours of confirmation.'
  },
  {
    icon: Briefcase,
    title: 'Flexible Engagement',
    description: 'Choose from contract, contract-to-hire, or full-time engagement models.'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: '24/7 support and dedicated account management throughout the engagement.'
  }
]

export default function Roles() {
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
              Roles We
              <span className="gradient-text"> Provide</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access to 1000+ pre-vetted IT professionals across all major domains. 
              From Salesforce experts to AI engineers, we have the right talent for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Role Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {roleCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-20 last:mb-0"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.roles.map((role, roleIndex) => (
                  <Card key={roleIndex} className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {role.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
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
              Why Choose Our Talent
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We ensure you get the best professionals who can deliver exceptional results for your projects.
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
              Need a Specific Role?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't see the exact role you're looking for? We can help you find the perfect match for your unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Request Talent
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
