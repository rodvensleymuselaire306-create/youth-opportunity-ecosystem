import express, { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database'
import { validateRequest } from '../middleware/validation.middleware'
import logger from '../config/logger'

const router: Router = express.Router()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userType: z.enum(['young', 'mentor', 'organization', 'admin']),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Register
router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const { email, password, firstName, lastName, userType } = req.body

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists',
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
        account_status: 'active',
      },
    })

    logger.info(`New user registered: ${email}`)

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    )

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
        },
        token,
      },
    })
  } catch (error) {
    logger.error('Registration error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// Login
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.users.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash || '')
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      })
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    )

    logger.info(`User logged in: ${email}`)

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
        },
        token,
      },
    })
  } catch (error) {
    logger.error('Login error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

export default router
