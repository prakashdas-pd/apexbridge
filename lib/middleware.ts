import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'

export function withAuth(handler: (req: NextRequest, context: { user: any }) => Promise<NextResponse>) {
  return async (request: NextRequest, context?: any) => {
    const user = getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return handler(request, { user, ...context })
  }
}

export function withAdminAuth(handler: (req: NextRequest, context: { user: any }) => Promise<NextResponse>) {
  return async (request: NextRequest, context?: any) => {
    const user = getUserFromRequest(request)
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }
    
    return handler(request, { user, ...context })
  }
}
