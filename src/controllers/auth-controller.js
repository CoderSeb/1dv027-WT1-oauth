
export default class AuthController {
  async showProfile(req, res, next) {
    const viewData = req.session.user
    res.render('pages/profile', { viewData })
  }
}