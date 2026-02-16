'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Calendar, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const portfolioProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform Transformation',
    category: 'Digital Transformation',
    client: 'Global Retail Chain',
    description: 'Complete digital transformation of legacy e-commerce platform, resulting in 300% increase in online sales and improved customer experience.',
    images: [
      '/projects/project-1-1.jpg',
      '/projects/project-1-2.jpg', 
      '/projects/project-1-3.jpg',
      '/projects/project-1-4.jpg'
    ],
    imageHeadings: [
      'Modern Dashboard Interface',
      'Product Catalog System',
      'Mobile Shopping Experience',
      'Analytics & Reporting'
    ],
    fallbackImages: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556742502-057b6450738c?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format'
    ],
    technologies: ['React', 'Node.js', 'AWS', 'MongoDB', 'Redis'],
    duration: '6 months',
    teamSize: '8 developers',
    keyFeatures: [
      'Real-time inventory management',
      'AI-powered recommendations',
      'Multi-currency support',
      'Progressive Web App'
    ],
    results: [
      '300% increase in online sales',
      '60% reduction in page load time',
      '45% improvement in conversion rate',
      '99.9% uptime achieved'
    ],
    testimonial: {
      quote: 'Apex Bridge Solutions transformed our entire digital infrastructure. Their expertise and dedication exceeded our expectations.',
      author: 'Sarah Johnson',
      position: 'CTO',
      company: 'Global Retail Chain'
    }
  },
  {
    id: 2,
    title: 'Healthcare Management System',
    category: 'Healthcare IT',
    client: 'Regional Hospital Network',
    description: 'Developed comprehensive healthcare management system with HIPAA compliance, serving 50,000+ patients across 15 facilities.',
    images: [
      '/projects/project-2-1.jpg',
      '/projects/project-2-2.jpg',
      '/projects/project-2-3.jpg', 
      '/projects/project-2-4.jpg'
    ],
    imageHeadings: [
      'Patient Dashboard',
      'Doctor Portal Interface',
      'Telemedicine Platform',
      'HIPAA Compliance Reports'
    ],
    fallbackImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551190822-a93349d22a44?w=800&h=600&fit=crop&auto=format'
    ],
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
    duration: '9 months',
    teamSize: '12 developers',
    keyFeatures: [
      'Electronic Health Records',
      'Telemedicine integration',
      'AI-powered diagnostics',
      'Real-time monitoring'
    ],
    results: [
      '40% reduction in administrative costs',
      '50% faster patient processing',
      '95% patient satisfaction',
      'HIPAA compliance achieved'
    ],
    testimonial: {
      quote: 'The healthcare system they built has revolutionized how we deliver care. Patient outcomes have improved significantly.',
      author: 'Dr. Michael Chen',
      position: 'Medical Director',
      company: 'Regional Hospital Network'
    }
  },
  {
    id: 3,
    title: 'Financial Services Platform',
    category: 'FinTech',
    client: 'Investment Banking Firm',
    description: 'Built secure, scalable financial platform handling $2B+ in daily transactions with real-time analytics and risk management.',
    images: [
      '/projects/project-3-1.jpg',
      '/projects/project-3-2.jpg',
      '/projects/project-3-3.jpg',
      '/projects/project-3-4.jpg'
    ],
    imageHeadings: [
      'Trading Dashboard',
      'Risk Analytics Interface',
      'Portfolio Management System',
      'Compliance & Security Center'
    ],
    fallbackImages: [
      'https://images.unsplash.com/photo-1563986768609-3c5ca5e99c6c?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format'
    ],
    technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure', 'Blockchain'],
    duration: '12 months',
    teamSize: '15 developers',
    keyFeatures: [
      'Real-time trading engine',
      'Advanced risk analytics',
      'Automated compliance',
      'Mobile trading app'
    ],
    results: [
      '99.99% system uptime',
      '50% reduction in processing time',
      '200% increase in user base',
      'Zero security breaches'
    ],
    testimonial: {
      quote: 'Their expertise in financial technology and security is unmatched. We couldn\'t have achieved our goals without them.',
      author: 'Robert Williams',
      position: 'CEO',
      company: 'Investment Banking Firm'
    }
  },
  {
    id: 4,
    title: 'AI-Powered Supply Chain',
    category: 'AI & Machine Learning',
    client: 'Manufacturing Conglomerate',
    description: 'Implemented AI-driven supply chain optimization reducing costs by 35% while improving delivery times across 200+ locations.',
    images: [
      '/projects/project-4-1.jpg',
      '/projects/project-4-2.jpg',
      '/projects/project-4-3.jpg',
      '/projects/project-4-4.jpg'
    ],
    imageHeadings: [
      'AI Supply Chain Dashboard',
      'Predictive Analytics Interface',
      'Real-time Tracking System',
      'Cost Optimization Engine'
    ],
    fallbackImages: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4a?w=800&h=600&fit=crop&auto=format'
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'Apache Kafka', 'Elasticsearch'],
    duration: '8 months',
    teamSize: '10 developers',
    keyFeatures: [
      'Predictive demand forecasting',
      'Real-time tracking',
      'Automated routing',
      'Cost optimization algorithms'
    ],
    results: [
      '35% reduction in costs',
      '50% improvement in delivery times',
      '90% accuracy in forecasting',
      '25% increase in efficiency'
    ],
    testimonial: {
      quote: 'The AI solution has transformed our supply chain operations. The ROI exceeded our projections by 200%.',
      author: 'Lisa Anderson',
      position: 'COO',
      company: 'Manufacturing Conglomerate'
    }
  },
  {
    id: 5,
    title: 'Salesforce CRM Implementation',
    category: 'Salesforce Solutions',
    client: 'SaaS Company',
    description: 'Custom Salesforce implementation with 3rd party integrations, improving sales team productivity by 70%.',
    images: [
      '/projects/project-5-1.jpg',
      '/projects/project-5-2.jpg',
      '/projects/project-5-3.jpg',
      '/projects/project-5-4.jpg'
    ],
    imageHeadings: [
      'Sales Performance Dashboard',
      'Customer 360° View',
      'Automation Workflow Builder',
      'Custom Analytics Reports'
    ],
    fallbackImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552664730-d307be884d85?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&auto=format'
    ],
    technologies: ['Salesforce', 'Apex', 'Lightning', 'MuleSoft', 'Tableau'],
    duration: '4 months',
    teamSize: '6 developers',
    keyFeatures: [
      'Custom Lightning components',
      'Automated workflows',
      'Advanced reporting',
      'Mobile optimization'
    ],
    results: [
      '70% increase in productivity',
      '40% reduction in data entry',
      '85% user adoption rate',
      '50% faster sales cycles'
    ],
    testimonial: {
      quote: 'The Salesforce implementation has revolutionized our sales process. Our team is more efficient than ever.',
      author: 'Jennifer Martinez',
      position: 'VP Sales',
      company: 'SaaS Company'
    }
  },
  {
    id: 6,
    title: 'Educational Technology Platform',
    category: 'EdTech',
    client: 'Online Learning Provider',
    description: 'Developed comprehensive learning management system serving 100,000+ students with AI-powered personalization.',
    images: [
      '/projects/project-6-1.jpg',
      '/projects/project-6-2.jpg',
      '/projects/project-6-3.jpg',
      '/projects/project-6-4.jpg'
    ],
    imageHeadings: [
      'Student Learning Dashboard',
      'Course Management System',
      'Virtual Classroom Interface',
      'AI-Powered Progress Analytics'
    ],
    fallbackImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&auto=format'
    ],
    technologies: ['React Native', 'Node.js', 'GraphQL', 'AWS', 'AI/ML'],
    duration: '10 months',
    teamSize: '14 developers',
    keyFeatures: [
      'AI-powered learning paths',
      'Virtual classrooms',
      'Interactive assessments',
      'Progress tracking'
    ],
    results: [
      '100,000+ active students',
      '85% course completion rate',
      '4.8/5 student satisfaction',
      '300% ROI in first year'
    ],
    testimonial: {
      quote: 'The platform they built has transformed how we deliver education. Student engagement has never been higher.',
      author: 'David Thompson',
      position: 'CEO',
      company: 'Online Learning Provider'
    }
  }
]

const categories = ['All', 'Digital Transformation', 'Healthcare IT', 'FinTech', 'AI & Machine Learning', 'Salesforce Solutions', 'EdTech']

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const filteredProjects = selectedCategory === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory)

  const currentProject = filteredProjects[currentProjectIndex]
  const currentImages = currentProject?.images || []
  const currentFallbackImages = currentProject?.fallbackImages || []
  const currentImageHeadings = currentProject?.imageHeadings || []

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
    setIsAutoPlaying(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
    setIsAutoPlaying(false)
  }

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % filteredProjects.length)
    setCurrentImageIndex(0)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
    setCurrentImageIndex(0)
  }

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
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our success stories and see how we've helped businesses transform their digital presence 
              with innovative solutions and cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentProjectIndex(0)
                  setCurrentImageIndex(0)
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Portfolio Showcase */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {currentProject && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Carousel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Dynamic Image Heading */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`heading-${currentImageIndex}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50 backdrop-blur-md rounded-t-2xl p-4"
                  >
                    <h3 className="text-white text-lg font-semibold text-center">
                      {currentImageHeadings[currentImageIndex] || `Project Image ${currentImageIndex + 1}`}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mt-16">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* 3D Animated Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5"
                        animate={{
                          background: [
                            'linear-gradient(45deg, #0176d3 0%, #0288d1 50%, #039be5 100%)',
                            'linear-gradient(135deg, #0176d3 0%, #0288d1 50%, #039be5 100%)',
                            'linear-gradient(225deg, #0176d3 0%, #0288d1 50%, #039be5 100%)',
                            'linear-gradient(315deg, #0176d3 0%, #0288d1 50%, #039be5 100%)'
                          ]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          backgroundSize: '400% 400%',
                          animation: 'gradientShift 8s ease infinite'
                        }}
                      />
                      
                      {/* 3D Floating Elements */}
                      <motion.div
                        className="absolute top-4 left-4 w-8 h-8 bg-primary/20 rounded-full"
                        animate={{
                          y: [0, -20, 0],
                          rotate: [0, 180, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          boxShadow: '0 0 20px rgba(1, 118, 211, 0.3)'
                        }}
                      />
                      
                      <motion.div
                        className="absolute top-4 right-4 w-6 h-6 bg-accent/30 rounded-full"
                        animate={{
                          x: [0, 10, 0],
                          y: [0, -15, 0],
                          rotate: [0, -90, 180]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        style={{
                          boxShadow: '0 0 15px rgba(1, 118, 211, 0.2)'
                        }}
                      />
                      
                      <motion.div
                        className="absolute bottom-4 left-8 w-4 h-4 bg-primary/30 rounded-full"
                        animate={{
                          x: [0, 15, 0],
                          y: [0, 10, 0],
                          rotate: [0, 90, 180]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                      />
                      
                      <motion.div
                        className="absolute bottom-4 right-8 w-3 h-3 bg-accent/40 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                    </motion.div>
                    
                    <motion.img
                      key={currentImageIndex}
                      src={currentImages[currentImageIndex] || currentFallbackImages[currentImageIndex]}
                      alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover relative z-10"
                      style={{
                        transform: 'perspective(1000px)',
                        transformStyle: 'preserve-3d'
                      }}
                      initial={{ 
                        opacity: 0, 
                        scale: 1.1,
                        rotateY: -15
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotateY: 0
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.9,
                        rotateY: 15
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 10,
                        transition: { duration: 0.3 }
                      }}
                      onError={(e) => {
                        // Fallback to AI-generated image if local image fails to load
                        if (e.currentTarget.src !== currentFallbackImages[currentImageIndex]) {
                          e.currentTarget.src = currentFallbackImages[currentImageIndex]
                        }
                      }}
                    />
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index)
                          setIsAutoPlaying(false)
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Auto-play Toggle */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <div className={`w-4 h-4 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-red-500'}`} />
                  </button>
                </div>

                {/* Project Navigation */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-accent rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous Project</span>
                  </button>
                  <button
                    onClick={nextProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-accent rounded-lg transition-colors"
                  >
                    <span>Next Project</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>

              {/* Project Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {currentProject.category}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{currentProject.client}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {currentProject.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {currentProject.description}
                  </p>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{currentProject.duration}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm text-muted-foreground">Team Size</div>
                      <div className="font-semibold">{currentProject.teamSize}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {currentProject.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Results Achieved</h3>
                  <ul className="space-y-2">
                    {currentProject.results.map((result, index) => (
                      <li key={index} className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-3" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <blockquote className="text-lg text-muted-foreground mb-4 italic">
                      "{currentProject.testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-foreground">
                        {currentProject.testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentProject.testimonial.position}, {currentProject.testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              All Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete portfolio of successful projects across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      onClick={() => {
                        setCurrentProjectIndex(filteredProjects.findIndex(p => p.id === project.id))
                        setCurrentImageIndex(0)
                      }}>
                  <div className="relative aspect-video overflow-hidden rounded-t-lg image-3d">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(1, 118, 211, 0.1) 0%, rgba(1, 118, 211, 0.05) 50%, rgba(1, 118, 211, 0.1) 100%)',
                          'linear-gradient(135deg, rgba(1, 118, 211, 0.1) 0%, rgba(1, 118, 211, 0.05) 50%, rgba(1, 118, 211, 0.1) 100%)',
                          'linear-gradient(225deg, rgba(1, 118, 211, 0.1) 0%, rgba(1, 118, 211, 0.05) 50%, rgba(1, 118, 211, 0.1) 100%)',
                          'linear-gradient(315deg, rgba(1, 118, 211, 0.1) 0%, rgba(1, 118, 211, 0.05) 50%, rgba(1, 118, 211, 0.1) 100%)'
                        ]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '400% 400%',
                        animation: 'gradientShift 10s ease infinite'
                      }}
                    />
                    
                    <motion.div
                      className="absolute top-2 left-2 w-6 h-6 bg-primary/20 rounded-full floating-element"
                      animate={{
                        rotate: [0, 90, 180, 270],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.div
                      className="absolute top-2 right-2 w-4 h-4 bg-accent/30 rounded-full rotating-element"
                      animate={{
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <img
                      src={project.images[0] || project.fallbackImages[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        transform: 'perspective(1000px)',
                        transformStyle: 'preserve-3d'
                      }}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8,
                        rotateY: -10
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotateY: 0
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotateX: 5,
                        rotateY: 10,
                        transition: { duration: 0.3 }
                      }}
                      onError={(e) => {
                        // Fallback to AI-generated image if local image fails to load
                        if (e.currentTarget.src !== project.fallbackImages[0]) {
                          e.currentTarget.src = project.fallbackImages[0]
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        {project.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{project.client}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create something amazing together. Get in touch with our team to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/solutions">View Our Solutions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
