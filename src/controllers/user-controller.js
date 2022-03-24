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
      const perPage = 20
      for (let i = 1; i <= 6; i++) {
        options.params = {
          per_page: perPage,
          page: i
        }
        const url = `https://gitlab.lnu.se/api/v4/users/${req.session.user.id}/events`
        const response = await axios.get(url, options)
        if (response.status !== 200) {
          throw createError(400, "Couldn't fetch activities from Gitlab")
        }
        i === 6
          ? allEvents.push(response.data[0])
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
