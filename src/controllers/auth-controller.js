import { getInformation } from '../helpers/gitlab-methods.js'

export default class AuthController {
  async showProfile(req, res, next) {
  if (req.user) {
    const viewData = await getInformation(req.user.access_token)
  
    res.render('pages/profile', { viewData })
  } else {
    res.redirect('/')
  }
  }
}