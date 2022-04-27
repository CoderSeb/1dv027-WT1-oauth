import createError from 'http-errors'
import { getActivities } from '../helpers/helpers.js'
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
      const auth = `${req.session.creds.token_type} ${req.session.creds.access_token}`
      viewData.events = await getActivities(auth, req.session.user.id)
      res.render('pages/activities', { viewData })
    } catch (err) {
      if (err.status) next(err)
      next(createError(500, err.message))
    }
  }
}
