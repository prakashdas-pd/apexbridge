'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Users, Building, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'info@apexbridgesolutions.com',
    description: 'Get in touch for general inquiries and partnerships',
    href: 'mailto:info@apexbridgesolutions.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 (123) 456-7890',
    description: 'Monday to Friday, 9:00 AM - 6:00 PM IST',
    href: 'tel:+911234567890'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Nagpur, Maharashtra',
    description: 'Headquarters and main operations center',
    href: '#'
  }
]

const officeLocations = [
  {
    city: 'Nagpur',
    address: '123 Wardha Road, IT Park',
    state: 'Maharashtra 440012',
    phone: '+91 (123) 456-7890',
    email: 'nagpur@apexbridgesolutions.com'
  },
  {
    city: 'Mumbai',
    address: '456 Bandra Kurla Complex, Building A',
    state: 'Maharashtra 400051',
    phone: '+91 (987) 654-3210',
    email: 'mumbai@apexbridgesolutions.com'
  },
  {
    city: 'Remote',
    address: 'Global Team',
    state: 'Available Worldwide',
    phone: '+91 (123) 456-7890',
    email: 'remote@apexbridgesolutions.com'
  }
]

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/apex-bridge-solutions',
    color: 'text-blue-600 hover:text-blue-700'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/apexbridge',
    color: 'text-sky-500 hover:text-sky-600'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/apexbridgesolutions',
    color: 'text-blue-500 hover:text-blue-600'
  }
]

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'We offer IT staff augmentation, Salesforce services, cloud & AI services, and specialized talent solutions across various technology domains.'
  },
  {
    question: 'How quickly can you provide resources?',
    answer: 'We can typically provide qualified resources within 48-72 hours of confirmation, depending on the specific requirements.'
  },
  {
    question: 'Do you offer remote and on-site options?',
    answer: 'Yes, we offer both remote and on-site engagement models based on your project requirements and preferences.'
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve multiple industries including Insurance, Healthcare, Education, Banking & Finance, and Retail.'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    })
    
    // Show success message (you can implement a toast notification here)
    alert('Thank you for your message! We will get back to you soon.')
  }

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
              <MessageCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Get in
              <span className="gradient-text"> Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to transform your IT team or explore our services? 
              We're here to help you achieve your business goals with exceptional talent and solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
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
              Ways to Reach Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the most convenient way to connect with our team. We're always ready to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                    <a 
                      href={info.href}
                      className="text-lg text-primary font-medium mb-2 hover:underline block"
                    >
                      {info.value}
                    </a>
                    <p className="text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Offices */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Company
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Acme Corporation"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a service</option>
                        <option value="staff-augmentation">IT Staff Augmentation</option>
                        <option value="salesforce">Salesforce Services</option>
                        <option value="cloud-ai">Cloud & AI Services</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Tell us about your project or requirements..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Offices</h3>
                {officeLocations.map((office, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">{office.city}</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>{office.address}</p>
                            <p>{office.state}</p>
                            <a href={`tel:${office.phone}`} className="text-primary hover:underline">
                              {office.phone}
                            </a>
                            <a href={`mailto:${office.email}`} className="text-primary hover:underline block">
                              {office.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our services and processes.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-3">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Follow us on social media for updates, insights, and company news.
            </p>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-background rounded-full flex items-center justify-center border hover:bg-primary hover:text-primary-foreground transition-colors ${social.color}`}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
