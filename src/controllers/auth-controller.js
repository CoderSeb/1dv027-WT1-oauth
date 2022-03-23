import axios from 'axios'
import createError from 'http-errors'


/**
 * Authentication controller.
 *
 * @class AuthController
 */
export default class AuthController {
  /**
   * Destroys session and browser cookie.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async logout (req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw createError(500, err.message)
        }
        res.clearCookie(process.env.SESSION_NAME)
        return res.redirect('/')
      })
    } catch (err) {
      if (err.status) next(err)
      next(createError(500, err.message))
    }
  }

  async refreshToken (req, res, next) {
    try {
      if (!req.session.creds) {
        throw createError(403)
      }
      const params = {
        client_id: process.env.GITLAB_OAUTH_CLIENT_ID,
        refresh_token: req.session.creds.refresh_token,
        redirect_uri: process.env.GITLAB_OAUTH_CALLBACK_URL,
        grant_type: 'refresh_token'
      }
  
      const qs = new URLSearchParams(params)
      const response = await axios.post(
        `${process.env.GITLAB_OAUTH_TOKEN_URL}`,
        qs.toString()
      )
  
      req.session.creds = response.data
      res.redirect('/')
    } catch (err) {
      if (err.status) next(err)
      next(createError(500, err.message))
    }
  }

  /**
   * Redirects to /user/profile.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async redirectProfile (req, res, next) {
    res.redirect('/user/profile')
  }
}
