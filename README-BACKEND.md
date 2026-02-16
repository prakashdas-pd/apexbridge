# Apex Bridge Solutions - Backend Setup

This document outlines the complete backend architecture for Apex Bridge Solutions.

## 🏗️ Architecture Overview

The backend is built using Next.js API routes with the following stack:
- **Framework**: Next.js 16.1.6
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with HTTP-only cookies
- **Validation**: Zod schemas
- **Security**: bcryptjs for password hashing

## 📁 Project Structure

```
my-app/
├── app/
│   └── api/
│       ├── route.ts              # API health check
│       ├── auth/
│       │   └── route.ts          # Authentication endpoints
│       ├── contact/
│       │   └── route.ts          # Contact form handling
│       ├── services/
│       │   └── route.ts          # Service information
│       └── booking/
│           └── route.ts          # Booking system
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   ├── middleware.ts             # Auth middleware
│   └── prisma.ts                 # Prisma client
├── prisma/
│   └── schema.prisma             # Database schema
└── env.example                   # Environment variables template
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the environment template and configure your variables:

```bash
cp env.example .env.local
```

Required environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/apex_bridge"
JWT_SECRET="your-super-secret-jwt-key"
```

Optional variables for additional features:
```env
# Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Calendar Integration
GOOGLE_CALENDAR_CLIENT_ID="your-google-client-id"
GOOGLE_CALENDAR_CLIENT_SECRET="your-google-client-secret"

# File Upload
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="apex-bridge-uploads"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## 📡 API Endpoints

### Base API
- `GET /api` - API health check and endpoint list

### Authentication
- `POST /api/auth` - Login/Register
  - Body: `{ action: "login" | "register", email, password, name?, company? }`
- `GET /api/auth` - Get current user (requires auth)

### Contact Form
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, phone?, company?, service, message, budget? }`

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Submit service inquiry
  - Body: `{ serviceId, requirements }`

### Booking System
- `POST /api/booking` - Book consultation
  - Body: `{ name, email, phone, company?, service, preferredDate, preferredTime, timezone, meetingType }`
- `GET /api/booking?date=YYYY-MM-DD` - Get available time slots

## 🔐 Authentication

The API uses JWT tokens stored in HTTP-only cookies for secure authentication.

### Login Flow
1. Send POST request to `/api/auth` with `action: "login"`
2. Server validates credentials and sets HTTP-only cookie
3. Subsequent requests automatically include the cookie

### Register Flow
1. Send POST request to `/api/auth` with `action: "register"`
2. Server creates user and sets HTTP-only cookie
3. User is automatically logged in

### Protected Routes
Use the `withAuth` and `withAdminAuth` middleware from `lib/middleware.ts`:

```typescript
import { withAuth } from '@/lib/middleware'

export const GET = withAuth(async (request, { user }) => {
  // User is authenticated
  return NextResponse.json({ user })
})
```

## 🗄️ Database Schema

The application uses the following main models:

### Users
- Authentication and user management
- Roles: ADMIN, USER, STAFF

### Contacts
- Contact form submissions
- Status tracking: NEW, CONTACTED, QUALIFIED, CONVERTED, CLOSED

### Services & Inquiries
- Service information and inquiries
- Status tracking: NEW, REVIEWING, QUOTE_SENT, NEGOTIATING, ACCEPTED, REJECTED

### Bookings
- Consultation booking system
- Calendar integration ready
- Status tracking: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, RESCHEDULED

### Talent Management
- Staff/talent database
- Skills, experience, availability tracking
- Project assignments

### Projects
- Project management
- Budget and timeline tracking
- Talent assignments

### Testimonials
- Customer testimonials
- Approval workflow

## 🔧 Database Management

### View Database
```bash
npm run db:studio
```

### Reset Database
```bash
npm run db:push --force-reset
```

### Generate Types
```bash
npm run db:generate
```

## 📧 Email Integration

The backend is structured to easily integrate email services:

1. Install email service dependencies
2. Configure SMTP environment variables
3. Update API routes to send emails

Example email integration:
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
```

## 📅 Calendar Integration

The booking system is ready for calendar integration:

1. Configure Google Calendar credentials
2. Implement calendar API calls in booking route
3. Sync booking data with calendar events

## 📁 File Upload

The system supports file uploads for:
- Resumes (talent management)
- Portfolios
- Project documents

Configure AWS S3 credentials to enable file uploads.

## 🧪 Testing

API endpoints can be tested using:
- Postman collection
- curl commands
- Frontend integration

Example curl command:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "service": "staff-augmentation",
    "message": "I need developers for my project"
  }'
```

## 🔒 Security Features

- JWT token authentication
- HTTP-only cookies
- Password hashing with bcryptjs
- Input validation with Zod
- CORS protection
- SQL injection prevention (Prisma ORM)

## 📊 Monitoring & Logging

The API includes basic error logging. For production:
- Add structured logging
- Implement monitoring (e.g., Sentry)
- Set up health checks
- Add rate limiting

## 🚀 Deployment

### Environment Setup
1. Configure production database
2. Set environment variables
3. Generate Prisma client
4. Run database migrations

### Build & Deploy
```bash
npm run build
npm start
```

## 🤝 Contributing

When adding new features:
1. Update database schema if needed
2. Add validation schemas
3. Implement proper error handling
4. Add authentication if required
5. Update documentation

## 📞 Support

For backend issues:
1. Check environment variables
2. Verify database connection
3. Review API logs
4. Test with Postman/curl
