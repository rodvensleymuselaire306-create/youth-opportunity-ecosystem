import express, { Router } from 'express'
import { authenticate, authorize } from '../middleware/auth.middleware'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Admin dashboard stats
router.get('/dashboard/stats', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [usersCount, opportunitiesCount, organizationsCount, applicationsCount] = await Promise.all([
      prisma.users.count(),
      prisma.opportunities.count(),
      prisma.organizations.count(),
      prisma.opportunity_applications.count(),
    ])

    res.json({
      status: 'success',
      data: {
        users: usersCount,
        opportunities: opportunitiesCount,
        organizations: organizationsCount,
        applications: applicationsCount,
      },
    })
  } catch (error) {
    logger.error('Get admin stats error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Get opportunities pending verification
router.get('/opportunities/pending', authenticate, authorize('admin'), async (req, res) => {
  try {
    const opportunities = await prisma.opportunities.findMany({
      where: { verification_status: 'pending' },
      include: { organizations: true },
      orderBy: { created_at: 'desc' },
    })

    res.json({
      status: 'success',
      data: opportunities,
    })
  } catch (error) {
    logger.error('Get pending opportunities error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Verify opportunity
router.put('/opportunities/:id/verify', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { verified } = req.body

    const opportunity = await prisma.opportunities.update({
      where: { id: req.params.id },
      data: {
        is_verified: verified,
        verification_status: verified ? 'verified' : 'unverified',
        verified_by: req.user?.id,
        verified_at: new Date(),
      },
    })

    logger.info(`Opportunity verified: ${req.params.id}`)

    res.json({
      status: 'success',
      data: opportunity,
    })
  } catch (error) {
    logger.error('Verify opportunity error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
