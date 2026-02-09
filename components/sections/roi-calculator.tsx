'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, TrendingUp, Users, Clock, DollarSign, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface ROICalculation {
  currentCost: number
  currentProductivity: number
  apexCost: number
  apexProductivity: number
  timeToHire: number
  projectDuration: number
}

export default function ROICalculator() {
  const [formData, setFormData] = useState<ROICalculation>({
    currentCost: 80000,
    currentProductivity: 70,
    apexCost: 60000,
    apexProductivity: 90,
    timeToHire: 8,
    projectDuration: 12
  })

  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: keyof ROICalculation, value: string) => {
    const numValue = parseFloat(value) || 0
    setFormData(prev => ({ ...prev, [field]: numValue }))
  }

  const calculateROI = () => {
    const currentMonthlyCost = formData.currentCost / 12
    const apexMonthlyCost = formData.apexCost / 12
    
    const currentValuePerMonth = currentMonthlyCost * (formData.currentProductivity / 100)
    const apexValuePerMonth = apexMonthlyCost * (formData.apexProductivity / 100)
    
    const monthlySavings = currentValuePerMonth - apexValuePerMonth
    const totalSavings = monthlySavings * formData.projectDuration
    
    const hiringCostSavings = (formData.timeToHire - 2) * (currentMonthlyCost / 30) * 0.5
    const totalBenefit = totalSavings + hiringCostSavings
    
    const roiPercentage = (totalBenefit / (formData.apexCost * formData.projectDuration / 12)) * 100
    
    return {
      monthlySavings,
      totalSavings,
      hiringCostSavings,
      totalBenefit,
      roiPercentage,
      currentValuePerMonth,
      apexValuePerMonth
    }
  }

  const results = calculateROI()

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
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            ROI Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much you can save with Apex Bridge Solutions. Calculate your ROI in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span>Enter Your Details</span>
                </CardTitle>
                <CardDescription>
                  Compare your current costs with Apex Bridge Solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Annual Salary ($)
                    </label>
                    <Input
                      type="number"
                      value={formData.currentCost}
                      onChange={(e) => handleInputChange('currentCost', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Productivity (%)
                    </label>
                    <Input
                      type="number"
                      value={formData.currentProductivity}
                      onChange={(e) => handleInputChange('currentProductivity', e.target.value)}
                      className="w-full"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Apex Annual Cost ($)
                    </label>
                    <Input
                      type="number"
                      value={formData.apexCost}
                      onChange={(e) => handleInputChange('apexCost', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Apex Productivity (%)
                    </label>
                    <Input
                      type="number"
                      value={formData.apexProductivity}
                      onChange={(e) => handleInputChange('apexProductivity', e.target.value)}
                      className="w-full"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Time to Hire (weeks)
                    </label>
                    <Input
                      type="number"
                      value={formData.timeToHire}
                      onChange={(e) => handleInputChange('timeToHire', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Duration (months)
                    </label>
                    <Input
                      type="number"
                      value={formData.projectDuration}
                      onChange={(e) => handleInputChange('projectDuration', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowResults(true)} 
                  className="w-full"
                  size="lg"
                >
                  Calculate ROI
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-primary">
                      <TrendingUp className="h-5 w-5" />
                      <span>Your ROI Results</span>
                    </CardTitle>
                    <CardDescription>
                      See the financial benefits of choosing Apex Bridge Solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Main ROI */}
                    <div className="text-center p-6 bg-primary/10 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {results.roiPercentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Return on Investment
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Monthly Savings</span>
                        </div>
                        <span className="font-semibold text-green-500">
                          ${results.monthlySavings.toFixed(0)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Hiring Cost Savings</span>
                        </div>
                        <span className="font-semibold text-blue-500">
                          ${results.hiringCostSavings.toFixed(0)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm">Total Benefit ({formData.projectDuration} months)</span>
                        </div>
                        <span className="font-semibold text-primary">
                          ${results.totalBenefit.toFixed(0)}
                        </span>
                      </div>
                    </div>

                    {/* Productivity Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-muted-foreground">
                          {formData.currentProductivity}%
                        </div>
                        <div className="text-xs text-muted-foreground">Current Productivity</div>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {formData.apexProductivity}%
                        </div>
                        <div className="text-xs text-muted-foreground">Apex Productivity</div>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <a href="/contact">Get Started with These Savings</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
