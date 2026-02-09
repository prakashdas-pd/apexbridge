'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CTO",
    company: "TechCorp Solutions",
    avatar: "SJ",
    rating: 5,
    content: "Apex Bridge Solutions has been instrumental in our digital transformation. Their Salesforce expertise and cloud solutions helped us streamline operations and increase efficiency by 40%. Highly recommended!",
    project: "Salesforce Implementation"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "VP of Engineering",
    company: "InnovateTech",
    avatar: "MC",
    rating: 5,
    content: "The talent pool at Apex Bridge is exceptional. We found top-tier AI engineers who delivered our machine learning project ahead of schedule. Their recruitment process is thorough and efficient.",
    project: "AI/ML Development"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Director of IT",
    company: "GlobalFinance Inc",
    avatar: "ER",
    rating: 5,
    content: "Working with Apex Bridge has been a game-changer for our IT infrastructure. Their cloud engineers helped us migrate to AWS with zero downtime. Professional, reliable, and results-oriented.",
    project: "Cloud Migration"
  },
  {
    id: 4,
    name: "David Kim",
    position: "CEO",
    company: "HealthTech Solutions",
    avatar: "DK",
    rating: 5,
    content: "The Salesforce consultants from Apex Bridge transformed our customer relationship management. Their understanding of healthcare regulations and Salesforce capabilities is unmatched.",
    project: "Healthcare CRM"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Product Manager",
    company: "RetailPro Systems",
    avatar: "LT",
    rating: 5,
    content: "Apex Bridge provided us with exceptional full-stack developers who integrated seamlessly with our team. Their agile approach and technical expertise accelerated our product development significantly.",
    project: "E-commerce Platform"
  }
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about working with Apex Bridge Solutions.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 lg:p-12 shadow-xl">
                <CardContent className="space-y-6">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="h-8 w-8 text-primary" />
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {currentTestimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{currentTestimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {currentTestimonial.position} at {currentTestimonial.company}
                        </div>
                        <div className="text-xs text-primary font-medium mt-1">
                          {currentTestimonial.project}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < currentTestimonial.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isAutoPlaying ? 'Pause' : 'Play'} Auto-play
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { label: 'Client Satisfaction', value: '98%' },
            { label: 'Projects Delivered', value: '2000+' },
            { label: 'Years of Experience', value: '10+' },
            { label: 'Team Members', value: '1000+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
