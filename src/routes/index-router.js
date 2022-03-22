import express from 'express'
import AuthController from '../controllers/auth-controller.js'
import IndexController from '../controllers/index-controller.js'
import { checkSession } from '../middleware/auth-middleware.js'
import { getGitlabInformation, handleGitlabCallback, revokeTokens } from '../middleware/gitlab-middlewares.js'
import { router as oauthRouter } from './oauth-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

const authController = new AuthController()
const indexController = new IndexController()

router.use('/user', checkSession, userRouter)
router.use('/api/oauth', oauthRouter)

router.get('/', indexController.showWelcome)



router.get(
  '/api/oauth/gitlab',
  handleGitlabCallback,
  getGitlabInformation,
  authController.redirectProfile)
