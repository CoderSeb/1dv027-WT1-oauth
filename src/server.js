import express from 'express'
import morgan from 'morgan'

const main = async () => {
  const port = process.env.PORT || 5000
  const server = express()
  server.use(morgan('dev'))

  server.get('/', (req, res) => {
    res.send('Seems to work...')
  })

  server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`)
  })
}

try {
  main()
} catch (err) {
  console.error(err.message)
}