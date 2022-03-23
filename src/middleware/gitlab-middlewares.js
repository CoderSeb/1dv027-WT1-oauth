import axios from 'axios'
import createError from 'http-errors'

/**
 * Function to handle Gitlab Oauth callback.
 *
 * @param {object} req  Express request object
 * @param {object} res Express response object
 * @param {Function} next Express next function
 */
export async function handleGitlabCallback (req, res, next) {
  try {
    const returnedCode = req.query.code
    const params = {
      client_id: process.env.GITLAB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITLAB_OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.GITLAB_CALLBACK_URL_DEV,
      code: returnedCode,
      grant_type: 'authorization_code'
    }

    const qs = new URLSearchParams(params)
    const response = await axios.post(
      `${process.env.GITLAB_OAUTH_TOKEN_URL}`,
      qs.toString()
    )

    req.session.creds = {
      access_token: response.data.access_token,
      token_type: response.data.token_type,
      refresh_token: response.data.refresh_token
    }
  } catch (err) {
    next(createError(400, err.message))
  }
  next()
}

/**
 * Revokes Gitlab access_token.
 *
 * @param {object} req  Express request object
 * @param {object} res Express response object
 * @param {Function} next Express next function
 */
export async function revokeTokens (req, res, next) {
  try {
    const params = {
      client_id: process.env.GITLAB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITLAB_OAUTH_CLIENT_SECRET,
      token: req.session.creds.access_token
    }
    const qs = new URLSearchParams(params)
    const response = await axios.post(
      `${process.env.GITLAB_OAUTH_REVOKE_URL}`,
      qs.toString()
    )
    if (response.status !== 200) {
      throw createError(500, "Token couldn't be revoked")
    }
  } catch (err) {
    if (err.status) next(err)
    next(createError(500, err.message))
  }
  next()
}

/**
 * Retrieves Gitlab user information and saves to session.
 *
 * @param {object} req  Express request object
 * @param {object} res Express response object
 * @param {Function} next Express next function
 */
export async function getGitlabInformation (req, res, next) {
  try {
    const url = `https://gitlab.lnu.se/api/v4/user?access_token=${req.session.creds.access_token}`
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw createError(500, "Token couldn't be revoked")
    }
    req.session.user = {
      id: response.data.id,
      name: response.data.name,
      username: response.data.username,
      avatar: response.data.avatar_url,
      lao: response.data.last_activity_on,
      email: response.data.email
    }
  } catch (err) {
    if (err.status) next(err)
    next(createError(500, err.message))
  }
  next()
}
