import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum(['staff-augmentation', 'salesforce', 'cloud-ai', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = contactSchema.parse(body)
    
    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        service: validatedData.service.toUpperCase().replace('-', '_'),
        message: validatedData.message,
        budget: validatedData.budget,
        status: 'NEW'
      }
    })
    
    console.log('Contact form submission saved:', contact)
    
    // Here you would typically:
    // 2. Send email notification
    // 3. Create CRM entry
    // 4. Send auto-response
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will contact you within 24 hours.',
      id: contact.id
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }
    
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process your request. Please try again.' 
      },
      { status: 500 }
    )
  }
}
