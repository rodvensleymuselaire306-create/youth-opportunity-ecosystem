import express, { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Get user notifications
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { unread } = req.query

    const where: any = { user_id: req.user!.id }
    if (unread === 'true') where.is_read = false

    const notifications = await prisma.notifications.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: 50,
    })

    res.json({
      status: 'success',
      data: notifications,
    })
  } catch (error) {
    logger.error('Get notifications error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Mark notification as read
router.put('/:id/read', authenticate, async (req: AuthRequest, res) => {
  try {
    const notification = await prisma.notifications.updateMany({
      where: { id: req.params.id, user_id: req.user!.id },
      data: { is_read: true, read_at: new Date() },
    })

    if (notification.count === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Notification not found',
      })
    }

    res.json({
      status: 'success',
      message: 'Notification marked as read',
    })
  } catch (error) {
    logger.error('Mark notification as read error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
