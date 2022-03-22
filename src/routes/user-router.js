import express from 'express'
import AuthController from '../controllers/auth-controller.js'
import UserController from '../controllers/user-controller.js'
import { revokeTokens } from '../middleware/gitlab-middlewares.js'
const authController = new AuthController()

export const router = express.Router()

const userController = new UserController()

router.get('/activities', userController.showActivities)

router.get('/profile', userController.showProfile)

router.get('/logout', revokeTokens, authController.logout)