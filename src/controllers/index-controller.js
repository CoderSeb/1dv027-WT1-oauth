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
        viewData = {
          gitlab_query: req.session.gitlabUrl
        }
        return res.render('pages/welcome', { viewData })
      }
    } catch (err) {
      next(createError(500, err.message))
    }
  }
}
