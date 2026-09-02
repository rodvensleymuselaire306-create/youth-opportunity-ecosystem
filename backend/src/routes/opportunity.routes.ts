import express, { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Get all opportunities with filters
router.get('/', async (req, res) => {
  try {
    const { category, location, status, limit = 20, offset = 0 } = req.query

    const where: any = {
      status: status || 'active',
    }

    if (category) where.category = category
    if (location) where.location = { contains: location as string, mode: 'insensitive' }

    const [opportunities, total] = await Promise.all([
      prisma.opportunities.findMany({
        where,
        include: { organizations: true },
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: { created_at: 'desc' },
      }),
      prisma.opportunities.count({ where }),
    ])

    res.json({
      status: 'success',
      data: opportunities,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    })
  } catch (error) {
    logger.error('Get opportunities error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Get opportunity by ID
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await prisma.opportunities.findUnique({
      where: { id: req.params.id },
      include: {
        organizations: true,
      },
    })

    if (!opportunity) {
      return res.status(404).json({
        status: 'error',
        message: 'Opportunity not found',
      })
    }

    // Increment view count
    await prisma.opportunities.update({
      where: { id: req.params.id },
      data: { view_count: { increment: 1 } },
    })

    res.json({
      status: 'success',
      data: opportunity,
    })
  } catch (error) {
    logger.error('Get opportunity error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Apply to opportunity
router.post('/:id/apply', authenticate, async (req: AuthRequest, res) => {
  try {
    const opportunity = await prisma.opportunities.findUnique({
      where: { id: req.params.id },
    })

    if (!opportunity) {
      return res.status(404).json({
        status: 'error',
        message: 'Opportunity not found',
      })
    }

    // Check if already applied
    const existingApplication = await prisma.opportunity_applications.findUnique({
      where: {
        opportunity_id_user_id: {
          opportunity_id: req.params.id,
          user_id: req.user!.id,
        },
      },
    })

    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'Already applied to this opportunity',
      })
    }

    const application = await prisma.opportunity_applications.create({
      data: {
        opportunity_id: req.params.id,
        user_id: req.user!.id,
        status: 'submitted',
      },
    })

    // Increment application count
    await prisma.opportunities.update({
      where: { id: req.params.id },
      data: { application_count: { increment: 1 } },
    })

    logger.info(`Application submitted: ${req.user!.id} -> ${req.params.id}`)

    res.status(201).json({
      status: 'success',
      data: application,
    })
  } catch (error) {
    logger.error('Apply to opportunity error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
