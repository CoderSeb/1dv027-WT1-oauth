import express from 'express'
import AuthController from '../controllers/auth-controller.js'
import IndexController from '../controllers/index-controller.js'
import { checkSession } from '../middleware/auth-middleware.js'
import { getGitlabInformation, handleGitlabCallback } from '../middleware/gitlab-middlewares.js'
export const router = express.Router()

const authController = new AuthController()
const indexController = new IndexController()

router.get('/activities', (req, res, next) => {
  const viewData = {}
  res.render('pages/activities', { viewData })
})

router.get('/profile', checkSession, authController.showProfile)

router.get('/logout', checkSession, authController.logout)

router.get('/', indexController.showWelcome)



router.get(
  '/api/oauth/gitlab',
  handleGitlabCallback,
  getGitlabInformation,
  authController.showProfile)
