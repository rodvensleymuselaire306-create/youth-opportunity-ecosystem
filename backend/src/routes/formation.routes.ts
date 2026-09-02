import express, { Router } from 'express'
import prisma from '../config/database'
import logger from '../config/logger'

const router: Router = express.Router()

// Get all formations
router.get('/', async (req, res) => {
  try {
    const { category, level, format, limit = 20, offset = 0 } = req.query

    const where: any = {}
    if (category) where.category_id = category
    if (level) where.level = level
    if (format) where.format = format

    const [formations, total] = await Promise.all([
      prisma.formations.findMany({
        where,
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
        orderBy: { created_at: 'desc' },
      }),
      prisma.formations.count({ where }),
    ])

    res.json({
      status: 'success',
      data: formations,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    })
  } catch (error) {
    logger.error('Get formations error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Get formation by ID
router.get('/:id', async (req, res) => {
  try {
    const formation = await prisma.formations.findUnique({
      where: { id: req.params.id },
    })

    if (!formation) {
      return res.status(404).json({
        status: 'error',
        message: 'Formation not found',
      })
    }

    res.json({
      status: 'success',
      data: formation,
    })
  } catch (error) {
    logger.error('Get formation error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
