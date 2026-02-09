'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock, DollarSign, Activity, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsData {
  visitors: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: number
  conversionRate: number
  leadsGenerated: number
  topPages: Array<{ page: string; views: number }>
  monthlyGrowth: Array<{ month: string; visitors: number; leads: number }>
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    visitors: 1247,
    pageViews: 3841,
    bounceRate: 32.5,
    avgSessionDuration: 245,
    conversionRate: 4.2,
    leadsGenerated: 52,
    topPages: [
      { page: 'Home', views: 1523 },
      { page: 'Services', views: 892 },
      { page: 'About Us', views: 634 },
      { page: 'Contact', views: 412 },
      { page: 'Careers', views: 380 }
    ],
    monthlyGrowth: [
      { month: 'Jan', visitors: 890, leads: 28 },
      { month: 'Feb', visitors: 1024, leads: 35 },
      { month: 'Mar', visitors: 1247, leads: 52 }
    ]
  })

  const [selectedPeriod, setSelectedPeriod] = useState('month')

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 8),
        avgSessionDuration: Math.max(120, prev.avgSessionDuration + (Math.random() - 0.5) * 10)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getGrowthIndicator = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100
    return {
      value: growth.toFixed(1),
      isPositive: growth > 0
    }
  }

  const latestGrowth = analytics.monthlyGrowth[analytics.monthlyGrowth.length - 1]
  const previousGrowth = analytics.monthlyGrowth[analytics.monthlyGrowth.length - 2]
  const visitorGrowth = getGrowthIndicator(latestGrowth.visitors, previousGrowth.visitors)
  const leadGrowth = getGrowthIndicator(latestGrowth.leads, previousGrowth.leads)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into your website performance and lead generation
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Visitors',
              value: analytics.visitors.toLocaleString(),
              change: visitorGrowth.value,
              isPositive: visitorGrowth.isPositive,
              icon: Users,
              color: 'text-blue-500'
            },
            {
              title: 'Page Views',
              value: analytics.pageViews.toLocaleString(),
              change: '+12.3%',
              isPositive: true,
              icon: Eye,
              color: 'text-green-500'
            },
            {
              title: 'Leads Generated',
              value: analytics.leadsGenerated,
              change: leadGrowth.value,
              isPositive: leadGrowth.isPositive,
              icon: TrendingUp,
              color: 'text-purple-500'
            },
            {
              title: 'Conversion Rate',
              value: `${analytics.conversionRate}%`,
              change: '+0.8%',
              isPositive: true,
              icon: Activity,
              color: 'text-orange-500'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      metric.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <TrendingUp className="h-3 w-3" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.title}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Engagement Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Engagement Metrics</span>
                </CardTitle>
                <CardDescription>
                  How users are interacting with your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Avg Session Duration</span>
                      <span className="text-sm font-medium">{formatDuration(analytics.avgSessionDuration)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((analytics.avgSessionDuration / 600) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Bounce Rate</span>
                      <span className="text-sm font-medium">{analytics.bounceRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analytics.bounceRate}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                      <span className="text-sm font-medium">{analytics.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analytics.conversionRate * 10}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(analytics.pageViews / analytics.visitors)}
                    </div>
                    <div className="text-xs text-muted-foreground">Pages/Session</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {analytics.leadsGenerated}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Leads</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MousePointer className="h-5 w-5 text-primary" />
                  <span>Top Pages</span>
                </CardTitle>
                <CardDescription>
                  Most visited pages on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPages.map((page, index) => {
                    const percentage = (page.views / analytics.pageViews) * 100
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{page.page}</span>
                          <span className="text-sm text-muted-foreground">
                            {page.views.toLocaleString()} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Monthly Growth</span>
              </CardTitle>
              <CardDescription>
                Visitor and lead growth over the last 3 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analytics.monthlyGrowth.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-blue-500">{month.visitors} visitors</span>
                        <span className="text-green-500">{month.leads} leads</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(month.visitors / 1500) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-green-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(month.leads / 60) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
