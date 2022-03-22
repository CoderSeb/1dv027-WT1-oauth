import express from 'express'
import AuthController from '../controllers/auth-controller.js'
import { getGitlabInformation, handleGitlabCallback, revokeTokens } from '../middleware/gitlab-middlewares.js'
export const router = express.Router()

const authController = new AuthController()

router.get(
  '/gitlab',
  handleGitlabCallback,
  getGitlabInformation,
  authController.redirectProfile)
