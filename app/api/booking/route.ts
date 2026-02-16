import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  service: z.enum(['staff-augmentation', 'salesforce', 'cloud-ai', 'consultation']),
  preferredDate: z.string(),
  preferredTime: z.string(),
  timezone: z.string(),
  message: z.string().optional(),
  meetingType: z.enum(['video-call', 'phone-call', 'in-person'])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = bookingSchema.parse(body)
    
    // Save to database
    const booking = await prisma.booking.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        serviceType: validatedData.service.toUpperCase().replace('-', '_'),
        preferredDate: new Date(validatedData.preferredDate),
        preferredTime: validatedData.preferredTime,
        timezone: validatedData.timezone,
        meetingType: validatedData.meetingType.toUpperCase().replace('-', '_'),
        message: validatedData.message,
        status: 'SCHEDULED',
        meetingLink: `https://meet.apexbridge.com/MT-${Date.now()}`
      }
    })
    
    console.log('Booking request saved:', booking)
    
    // Here you would typically:
    // 1. Check calendar availability
    // 2. Create calendar event
    // 3. Send confirmation email
    // 4. Update CRM
    // 5. Notify team members
    
    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully! Check your email for meeting details.',
      booking: {
        id: booking.id,
        meetingLink: booking.meetingLink,
        date: booking.preferredDate,
        time: booking.preferredTime,
        timezone: booking.timezone,
        meetingType: booking.meetingType,
        status: booking.status
      }
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
    
    console.error('Booking error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to book consultation. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    // Here you would check actual calendar availability
    // For now, return mock available slots
    const availableSlots = [
      '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
    ]
    
    return NextResponse.json({
      success: true,
      date: date || new Date().toISOString().split('T')[0],
      availableSlots,
      timezone: 'UTC'
    })
    
  } catch (error) {
    console.error('Availability check error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to check availability' 
      },
      { status: 500 }
    )
  }
}
