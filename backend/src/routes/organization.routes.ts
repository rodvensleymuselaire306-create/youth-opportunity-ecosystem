import express, { Router } from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Get all organizations
router.get('/', async (req, res) => {
  try {
    const { limit = 20, offset = 0, verified } = req.query

    const where: any = {}
    if (verified !== undefined) where.is_verified = verified === 'true'

    const [organizations, total] = await Promise.all([
      prisma.organizations.findMany({
        where,
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: { created_at: 'desc' },
      }),
      prisma.organizations.count({ where }),
    ])

    res.json({
      status: 'success',
      data: organizations,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    })
  } catch (error) {
    logger.error('Get organizations error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Get organization by ID
router.get('/:id', async (req, res) => {
  try {
    const organization = await prisma.organizations.findUnique({
      where: { id: req.params.id },
      include: {
        opportunities: {
          where: { status: 'active' },
          take: 10,
        },
      },
    })

    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found',
      })
    }

    res.json({
      status: 'success',
      data: organization,
    })
  } catch (error) {
    logger.error('Get organization error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Create organization (requires authentication)
router.post('/', authenticate, authorize('organization'), async (req: AuthRequest, res) => {
  try {
    const { name, description, website, email, phone, city, orgType } = req.body

    const organization = await prisma.organizations.create({
      data: {
        name,
        description,
        website,
        email,
        phone,
        city,
        org_type: orgType,
        created_by: req.user!.id,
      },
    })

    logger.info(`Organization created: ${organization.id} by ${req.user!.id}`)

    res.status(201).json({
      status: 'success',
      data: organization,
    })
  } catch (error) {
    logger.error('Create organization error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
