import axios from 'axios'


export default class UserController {
  async showProfile(req, res, next) {
    const viewData = req.session.user
    res.render('pages/profile', { viewData })
  }

  async showActivities(req, res, next) {
    let viewData = {}
    viewData.user = req.session.user
    const options = {
      headers: {
        'Authorization': `${req.session.creds.token_type} ${req.session.creds.access_token}`
      }
    }
    const url = `https://gitlab.lnu.se/api/v4/users/${req.session.user.id}/events`
    const response = await axios.get(url, options)
    viewData.events = response.data.map(event => {
      return {
        id: event.id,
        name: event.action_name,
        created_at: event.created_at,
        target_title: event.target_title || event.push_data.commit_title,
        target_type: event.target_type || event.push_data.ref_type
      }
    })

    res.render('pages/activities', { viewData })
  }
}