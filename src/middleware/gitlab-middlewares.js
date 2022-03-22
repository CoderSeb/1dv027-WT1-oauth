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
  req.session.creds = {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token
  }

  next()
}

export async function revokeTokens(req, res, next) {
  const params = {
    client_id: process.env.GITLAB_APPLICATION_ID_DEV,
    client_secret: process.env.GITLAB_APPLICATION_SECRET_DEV,
    token: req.session.creds.access_token,
  }
  const qs = new URLSearchParams(params)
  const response = await axios.post(`${process.env.GITLAB_OAUTH_REVOKE_URL}`, qs.toString())
  if (response.status !== 200) {
    throw new Error("Token couldn't be revoked")
  }
  next()
}

export async function getGitlabInformation(req, res, next) {
  const url = `https://gitlab.lnu.se/api/v4/user?access_token=${req.session.creds.access_token}`
  const response = await axios.get(url)
  req.session.user = {
    id: response.data.id,
    name: response.data.name,
    username: response.data.username,
    avatar: response.data.avatar_url,
    lao: response.data.last_activity_on,
    email: response.data.email
  }
  next()
}