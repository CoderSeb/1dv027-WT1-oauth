import express from 'express'
import AuthController from '../controllers/auth-controller.js'
import IndexController from '../controllers/index-controller.js'
import { handleGitlabCallback } from '../middleware/gitlab-middlewares.js'
export const router = express.Router()

const authController = new AuthController()
const indexController = new IndexController()

router.get('/activities', (req, res, next) => {
  const viewData = {}
  res.render('pages/activities', { viewData })
})

router.get('/profile', authController.showProfile)

router.get('/', indexController.showWelcome)

router.get(
  '/api/oauth/gitlab',
  handleGitlabCallback,
  authController.showProfile)
