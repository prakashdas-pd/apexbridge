'use client'

import { motion } from 'framer-motion'
import { Users, Target, Heart, Lightbulb, Award, Globe, Handshake, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const values = [
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We conduct business with honesty, transparency, and ethical principles in all our interactions.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies and creative solutions to drive business success.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in building strong partnerships and working together to achieve common goals.'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We are committed to delivering the highest quality services and exceeding client expectations.'
  }
]

const timeline = [
  {
    year: '2014',
    title: 'Founded',
    description: 'Apex Bridge Solutions was established with a vision to bridge the gap between exceptional IT talent and innovative companies.'
  },
  {
    year: '2016',
    title: 'Expansion',
    description: 'Expanded our services to include Salesforce consulting and cloud solutions, serving clients across multiple industries.'
  },
  {
    year: '2018',
    title: 'Growth',
    description: 'Reached 500+ happy clients and 1000+ IT professionals in our talent pool, becoming a trusted partner in IT staffing.'
  },
  {
    year: '2020',
    title: 'Innovation',
    description: 'Launched AI and automation services, helping businesses transform digitally with intelligent solutions.'
  },
  {
    year: '2024',
    title: 'Excellence',
    description: 'Recognized as a leading IT staff augmentation and Salesforce solutions provider with global reach.'
  }
]

const stats = [
  { label: 'Years in Business', value: '10+', icon: Award },
  { label: 'Countries Served', value: '25+', icon: Globe },
  { label: 'Client Retention', value: '95%', icon: Handshake },
  { label: 'Success Rate', value: '99%', icon: Target }
]

export default function AboutPage() {
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
              About <span className="gradient-text">Apex Bridge Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your trusted partner in IT excellence, connecting top talent with leading companies 
              to drive innovation and success in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Apex Bridge Solutions is a premier IT staffing and consulting company founded in 2014. 
                  We specialize in connecting businesses with exceptional IT talent and providing cutting-edge 
                  technology solutions that drive growth and innovation.
                </p>
                <p className="text-lg leading-relaxed">
                  Our team of experienced professionals brings deep industry knowledge and technical expertise 
                  to every project, ensuring our clients receive the highest quality service and support. 
                  We pride ourselves on our ability to understand unique business needs and deliver tailored 
                  solutions that exceed expectations.
                </p>
                <p className="text-lg leading-relaxed">
                  With a presence in over 25 countries and a track record of serving 500+ happy clients, 
                  we have established ourselves as a trusted partner in the IT industry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
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
              What Kind of Work We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive IT solutions that empower businesses to thrive in the digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'IT Staff Augmentation',
                description: 'Providing skilled IT professionals on contract to meet your project needs and scale your team efficiently.',
                icon: Users
              },
              {
                title: 'Salesforce Solutions',
                description: 'Complete Salesforce implementation, customization, integration, and support services.',
                icon: Target
              },
              {
                title: 'Cloud Services',
                description: 'Cloud infrastructure setup, management, migration, and optimization for maximum efficiency.',
                icon: Globe
              },
              {
                title: 'AI & Automation',
                description: 'Intelligent automation solutions, chatbots, and AI-powered applications to streamline operations.',
                icon: Lightbulb
              },
              {
                title: 'Software Development',
                description: 'Custom software solutions built with modern technologies to address your unique business challenges.',
                icon: Award
              },
              {
                title: 'IT Consulting',
                description: 'Strategic IT consulting to help you make informed technology decisions and drive digital transformation.',
                icon: Eye
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To bridge the gap between exceptional IT talent and innovative companies, 
                    empowering businesses to achieve their digital transformation goals through 
                    world-class staffing solutions and technology services.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To be the global leader in IT staffing and consulting, recognized for our 
                    commitment to excellence, innovation, and creating lasting partnerships that 
                    drive success for our clients and professionals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Values & Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The core principles that guide everything we do and how we serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A decade of excellence, innovation, and growth in the IT industry.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <Card className="inline-block text-left">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-primary font-semibold">{item.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
