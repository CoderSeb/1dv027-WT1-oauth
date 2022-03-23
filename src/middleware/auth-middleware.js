export async function checkSession(req, res, next) {
  try {
    if (!req.session.user) {
      return res.redirect('/')
    }
  } catch (err) {
    next(createError(400, err.message))
  }
  next()
}