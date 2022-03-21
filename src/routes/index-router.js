import express from 'express'
import AuthController from '../controllers/auth-controller.js'
import IndexController from '../controllers/index-controller.js'

export const router = express.Router()

const authController = new AuthController()
const indexController = new IndexController()

router.get('/activity', (req, res, next) => {
  const viewData = {
  }
  res.render('pages/activity', { viewData })
})

router.get('/', indexController.showWelcome)

router.get('/api/oauth/gitlab', authController.handleRedirect)
