import createError from 'http-errors'

/**
 * Checks if req.session.user exists, otherwise redirects to home.
 *
 * @param {object} req  Express request object
 * @param {object} res Express response object
 * @param {Function} next Express next function
 */
export async function checkSession (req, res, next) {
  try {
    if (!req.session.creds) {
      throw createError(403)
    }
    const expires = req.session.creds.created_at + req.session.creds.expires_in
    if ((Math.floor(Date.now() / 1000) - expires) > 0) {
      res.redirect('/api/oauth/refresh')
    }
  } catch (err) {
    if (err.status) next(err)
    next(createError(400, err.message))
  }
  next()
}
