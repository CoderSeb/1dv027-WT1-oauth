import axios from 'axios'
import createError from 'http-errors'

/**
 * Controller for user endpoints.
 */
export default class UserController {
  /**
   * Retrieves session data and renders profile page.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async showProfile (req, res, next) {
    const viewData = {
      user: req.session.user
    }
    res.render('pages/profile', { viewData })
  }

  /**
   * Retrieves events and renders activities page.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async showActivities (req, res, next) {
    try {
      const viewData = {}
      viewData.user = req.session.user
      let options = {
        headers: {
          Authorization: `${req.session.creds.token_type} ${req.session.creds.access_token}`
        }
      }
      const allEvents = []
      let maxEvents = 101 // The amount of events to get.
      const perPage = 25 // 1 - 100.
      let maxPages = Math.ceil(maxEvents / perPage)
      const lastPageEvents = maxEvents % perPage
      for (let i = 1; i <= maxPages; i++) {
        options.params = {
          per_page: perPage,
          page: i
        }
        const url = `https://gitlab.lnu.se/api/v4/users/${req.session.user.id}/events`
        const response = await axios.get(url, options)
        if (response.status !== 200) {
          throw createError(400, "Couldn't fetch activities from Gitlab")
        }
        if (response.headers['x-total-pages'] < maxPages) {
          maxPages = Number(response.headers['x-total-pages'])
          maxEvents = Number(response.headers['x-total'])
        }
        i === maxPages
          ? allEvents.push(...response.data.slice(0, lastPageEvents))
          : allEvents.push(...response.data)
      }
      viewData.events = allEvents.map((event) => {
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
