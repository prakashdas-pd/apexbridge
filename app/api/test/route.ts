import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Get counts of all records
    const contacts = await prisma.contact.count()
    const bookings = await prisma.booking.count()
    const inquiries = await prisma.serviceInquiry.count()
    const users = await prisma.user.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully',
      data: {
        contacts,
        bookings,
        inquiries,
        users,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
