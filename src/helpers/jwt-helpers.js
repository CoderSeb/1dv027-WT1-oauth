import createError from 'http-errors'
import jwt from 'jsonwebtoken'
/**
 *
 * @param data
 */
export const genJwt = (data) => {
  const token = jwt.sign({
    data: data || 'Nice try'
  }, process.env.TOKEN_SECRET, { expiresIn: '2m' })
  return token
}

/**
 *
 * @param token
 */
export const validateJwt = (token) => {
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (err) {
    throw createError(401, 'JWT have been tampered with!')
  }
}
