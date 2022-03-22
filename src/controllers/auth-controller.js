
export default class AuthController {
  async logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/')
    })
  }

  async redirectProfile(req, res, next) {
    res.redirect('/user/profile')
  }
}