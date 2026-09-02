import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import logger from './config/logger'
import { PrismaClient } from '@prisma/client'

// Import routes
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import opportunityRoutes from './routes/opportunity.routes'
import organizationRoutes from './routes/organization.routes'
import formationRoutes from './routes/formation.routes'
import mentorRoutes from './routes/mentor.routes'
import notificationRoutes from './routes/notification.routes'
import adminRoutes from './routes/admin.routes'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Middleware de sécurité
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/opportunities', opportunityRoutes)
app.use('/api/organizations', organizationRoutes)
app.use('/api/formations', formationRoutes)
app.use('/api/mentors', mentorRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err)
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  })
})

// Start server
const start = async () => {
  try {
    // Verify database connection
    await prisma.$connect()
    logger.info('Database connected')

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
