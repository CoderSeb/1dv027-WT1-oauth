import createError from 'http-errors'

/**
 * 
 *
 * @export
 * @class AuthController
 */
export default class AuthController {
  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.log(err)
          throw createError(500, err.message)
        }
        res.redirect('/')
      })
    } catch (err) {
      if (err.status) next(err)
      next(createError(500, err.message))
    }
  }

  async redirectProfile(req, res, next) {
    res.redirect('/user/profile')
  }
}