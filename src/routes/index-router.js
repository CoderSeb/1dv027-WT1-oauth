import express from 'express'
import createError from 'http-errors'
import IndexController from '../controllers/index-controller.js'
import { checkSession } from '../middleware/auth-middleware.js'
import { router as oauthRouter } from './oauth-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

const indexController = new IndexController()

router.use('/user', checkSession, userRouter)
router.use('/api/oauth', oauthRouter)

router.get('/', indexController.showWelcome)

router.get('*', (req, res, next) =>
  next(createError(404, 'Nothing to see here...'))
)
