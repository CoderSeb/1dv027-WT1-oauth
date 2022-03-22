
export default class AuthController {
  async showProfile(req, res, next) {
    const viewData = req.session.user
    res.render('pages/profile', { viewData })
  }

  async logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/')
    })
  }
}