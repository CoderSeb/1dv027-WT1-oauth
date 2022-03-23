import createError from 'http-errors'
import jwt from 'jsonwebtoken'

/**
 * Creates and returns a JWT.
 *
 * @param {object} data as optional jwt payload.
 * @returns {string} as the JWT.
 */
export const genJwt = (data) => {
  const token = jwt.sign({
    data: data || 'Nice try'
  }, process.env.TOKEN_SECRET, { expiresIn: '2m' })
  return token
}

/**
 * Validates the token, if any error throws a 401 http error.
 *
 * @param {string} token as the token.
 */
export const validateJwt = (token) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    throw createError(401, 'JWT have been tampered with!')
  }
}
