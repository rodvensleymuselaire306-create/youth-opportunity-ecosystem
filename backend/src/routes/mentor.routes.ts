import express, { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const { verified, limit = 20, offset = 0 } = req.query

    const where: any = {}
    if (verified !== undefined) where.is_verified = verified === 'true'

    const mentors = await prisma.mentors.findMany({
      where,
      include: { id: true }, // Will join with users table
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      orderBy: { created_at: 'desc' },
    })

    res.json({
      status: 'success',
      data: mentors,
    })
  } catch (error) {
    logger.error('Get mentors error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Get mentor by ID
router.get('/:id', async (req, res) => {
  try {
    const mentor = await prisma.mentors.findUnique({
      where: { id: req.params.id },
    })

    if (!mentor) {
      return res.status(404).json({
        status: 'error',
        message: 'Mentor not found',
      })
    }

    res.json({
      status: 'success',
      data: mentor,
    })
  } catch (error) {
    logger.error('Get mentor error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Request mentorship
router.post('/:id/request', authenticate, async (req: AuthRequest, res) => {
  try {
    const { goals, skillsToDevelop, durationWeeks, frequency } = req.body

    const mentorship = await prisma.mentorships.create({
      data: {
        mentor_id: req.params.id,
        mentee_id: req.user!.id,
        status: 'pending',
        goals,
        skills_to_develop: skillsToDevelop,
        duration_weeks: durationWeeks,
        frequency,
      },
    })

    logger.info(`Mentorship request: ${req.user!.id} -> ${req.params.id}`)

    res.status(201).json({
      status: 'success',
      data: mentorship,
    })
  } catch (error) {
    logger.error('Request mentorship error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
