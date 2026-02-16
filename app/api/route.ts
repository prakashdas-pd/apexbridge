import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      message: 'Apex Bridge Solutions API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        contact: '/api/contact',
        services: '/api/services',
        booking: '/api/booking',
        auth: '/api/auth'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
