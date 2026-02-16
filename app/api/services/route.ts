import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const services = [
  {
    id: 'staff-augmentation',
    title: 'IT Staff Augmentation',
    description: 'Skilled IT professionals on contract with flexible hiring options and quick joining resources.',
    features: [
      'Quick deployment (48-72 hours)',
      'Flexible engagement models',
      'Pre-vetted talent pool',
      'Cost-effective solutions',
      '24/7 support'
    ],
    roles: [
      'Salesforce Developers / Admins',
      'Cloud Engineers',
      'AI Engineers',
      'Software Developers',
      'QA & Support Engineers'
    ]
  },
  {
    id: 'salesforce',
    title: 'Salesforce Services',
    description: 'Complete Salesforce setup, customization, support, and integration solutions for your business.',
    features: [
      'Salesforce Implementation',
      'Custom Development',
      'Integration Services',
      'Data Migration',
      'Ongoing Support'
    ],
    certifications: [
      'Salesforce Certified',
      'Experience Cloud Experts',
      'Service Cloud Specialists'
    ]
  },
  {
    id: 'cloud-ai',
    title: 'Cloud & AI Services',
    description: 'Cloud setup, management, AI automation, and intelligent chatbot solutions.',
    features: [
      'Cloud Architecture Design',
      'AI/ML Implementation',
      'Chatbot Development',
      'Process Automation',
      'Data Analytics'
    ],
    technologies: [
      'AWS, Azure, GCP',
      'TensorFlow, PyTorch',
      'OpenAI, Anthropic',
      'Kubernetes, Docker'
    ]
  }
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: services
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch services' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, requirements, name, email, phone, company, budget, timeline } = body
    
    // Validate service exists
    const service = services.find(s => s.id === serviceId)
    if (!service) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid service selected' 
        },
        { status: 400 }
      )
    }
    
    // Save service inquiry to database
    const inquiry = await prisma.serviceInquiry.create({
      data: {
        serviceType: serviceId.toUpperCase().replace('-', '_'),
        requirements: JSON.stringify(requirements),
        budget: budget || null,
        timeline: timeline || null,
        status: 'NEW'
      }
    })
    
    console.log('Service inquiry saved:', inquiry)
    
    // Here you would:
    // 2. Notify relevant team
    // 3. Create follow-up task
    
    return NextResponse.json({
      success: true,
      message: `Thank you for your interest in ${service.title}! Our team will contact you soon.`,
      inquiryId: inquiry.id
    })
    
  } catch (error) {
    console.error('Service inquiry error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process service inquiry' 
      },
      { status: 500 }
    )
  }
}
