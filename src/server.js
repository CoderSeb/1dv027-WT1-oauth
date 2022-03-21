import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import morgan from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/index-router.js'
const main = async () => {
  const port = process.env.PORT || 5000
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  const server = express()

  server.use(morgan('dev'))

  server.set('view engine', 'ejs')
  server.set('views', join(directoryFullName, 'views'))
  server.use(expressLayouts)
  server.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
  server.use(express.static(join(directoryFullName, '..', 'public')))

  server.use(express.urlencoded({ extended: false }))

  server.use('/', router)

  server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`)
  })
}

try {
  main()
} catch (err) {
  console.error(err.message)
}