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
