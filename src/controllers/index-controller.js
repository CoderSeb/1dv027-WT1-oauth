import createError from 'http-errors'
/**
 * Controller for index endpoints.
 */
export default class IndexController {
  /**
   * Gathers Gitlab parameters as viewData and renders the welcome page.
   *
   * @param {object} req  Express request object
   * @param {object} res Express response object
   * @param {Function} next Express next function
   */
  async showWelcome (req, res, next) {
    try {
      let viewData = {}
      if (req.session.user) {
        res.redirect('/user/profile')
      } else {
        const options = {
          client_id: process.env.GITLAB_OAUTH_CLIENT_ID,
          redirect_uri: process.env.GITLAB_OAUTH_CALLBACK_URL,
          response_type: 'code',
          scope: ['read_api', 'read_user'].join(' ')
        }
        const qs = new URLSearchParams(options)
        const url = `${process.env.GITLAB_OAUTH_URL}${qs.toString()}`
        viewData = {
          gitlab_query: url
        }
        return res.render('pages/welcome', { viewData })
      }
    } catch (err) {
      next(createError(500, err.message))
    }
  }
}
