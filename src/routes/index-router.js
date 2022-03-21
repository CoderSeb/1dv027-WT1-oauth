import express from 'express'

export const router = express.Router()

router.get('/activity', (req, res, next) => {
  res.render('pages/activity')
})

router.get('/', (req, res, next) => {
  res.render('pages/welcome')
})


