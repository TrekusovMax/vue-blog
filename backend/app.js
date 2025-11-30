import 'dotenv/config'

import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import routes from './routes/index.js'

const port = 3002
const app = express()

app.use(express.static('../frontend/dist'))

app.use(cookieParser())
app.use(express.json())

app.use('/', routes)

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => console.log(`Server started on port ${port}`))
})
