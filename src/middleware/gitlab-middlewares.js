import axios from 'axios'

export async function handleGitlabCallback(req, res, next) {
  const returnedCode = req.query.code
  const params = {
    client_id: process.env.GITLAB_APPLICATION_ID_DEV,
    client_secret: process.env.GITLAB_APPLICATION_SECRET_DEV,
    redirect_uri: process.env.GITLAB_CALLBACK_URL_DEV,
    code: returnedCode,
    grant_type: 'authorization_code'
  }

  const qs = new URLSearchParams(params)
  const response = await axios.post(`${process.env.GITLAB_OAUTH_TOKEN_URL}`, qs.toString())
  req.user = {
    access_token: response.data.access_token
  }

  next()
}