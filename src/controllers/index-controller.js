
export default class IndexController {
  async showWelcome(req, res, next) {
    let viewData = {}
    if (req.session.user) {
      viewData = req.session.user
      console.log(viewData)
      return res.render('pages/welcome', { viewData })
    } else {
      const options = {
        client_id: process.env.GITLAB_APPLICATION_ID_DEV,
        redirect_uri: process.env.GITLAB_CALLBACK_URL_DEV,
        response_type: 'code',
        scope: [
          'read_api',
          'profile'
        ].join(' ')
      }
      const qs = new URLSearchParams(options)
      const url = `${process.env.GITLAB_OAUTH_URL}${qs.toString()}`
      viewData = {
        gitlab_query: url
      }
      return res.render('pages/welcome', { viewData })
    }
  }
}