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
    if (!req.session.user) {
      return res.redirect('/')
    }
  } catch (err) {
    next(createError(400, err.message))
  }
  next()
}

