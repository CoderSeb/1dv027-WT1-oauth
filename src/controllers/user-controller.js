import axios from 'axios'
import createError from 'http-errors'

export default class UserController {
  async showProfile(req, res, next) {
    const viewData = {
      user: req.session.user
    } 
    res.render('pages/profile', { viewData })
  }

  async showActivities(req, res, next) {
    try {
      let viewData = {}
    viewData.user = req.session.user
    const options = {
      headers: {
        'Authorization': `${req.session.creds.token_type} ${req.session.creds.access_token}`
      }
    }
    let allEvents = []
    let perPage = 20
    for (let i = 1; i <= 6; i++) {
      if (i === 6) {
        perPage = 1
      }
      const url = `https://gitlab.lnu.se/api/v4/users/${req.session.user.id}/events?sort&per_page=${perPage}&page=${i}`
      const response = await axios.get(url, options)
      if (response.status !== 200) {
        throw createError(400, "Couldn't fetch activities from Gitlab")
      }
      allEvents.push(...response.data)
    }
    viewData.events = allEvents.map(event => {
      return {
        id: event.id,
        name: event.action_name,
        created_at: event.created_at,
        target_title: event.target_title || event.push_data?.commit_title,
        target_type: event.target_type || event.push_data?.ref_type
      }
    })

    res.render('pages/activities', { viewData })
    } catch (err) {
      if (err.status) next(err)
      next(createError(500, err.message))
    }
  }
}