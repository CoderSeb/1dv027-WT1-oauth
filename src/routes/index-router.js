import express from 'express'

export const router = express.Router()

router.get('/login', (req, res, next) => {
  res.render('pages/login')
})

router.get('/activity', (req, res, next) => {
  res.render('pages/activity')
})

router.get('/', (req, res, next) => {
  res.render('pages/welcome')
})


