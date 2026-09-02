import express, { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user?.id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        bio: true,
        city: true,
        phone: true,
        education_level: true,
        study_field: true,
        user_type: true,
        created_at: true,
      },
    })

    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    logger.error('Get profile error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Update user profile
router.put('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const { firstName, lastName, bio, city, phone, educationLevel, studyField } = req.body

    const user = await prisma.users.update({
      where: { id: req.user?.id },
      data: {
        first_name: firstName,
        last_name: lastName,
        bio,
        city,
        phone,
        education_level: educationLevel,
        study_field: studyField,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        bio: true,
        city: true,
        phone: true,
      },
    })

    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    logger.error('Update profile error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        avatar_url: true,
        bio: true,
        city: true,
        education_level: true,
        study_field: true,
        created_at: true,
      },
    })

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
    }

    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    logger.error('Get user error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
