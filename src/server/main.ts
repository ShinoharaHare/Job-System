import config from './config'
import api from './routes/api'

import express from 'express'
import cookieParser from 'cookie-parser'
import history from 'connect-history-api-fallback'

import * as path from 'path'
import './account'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api', api)

app.use(history())
app.use(express.static(path.resolve(__dirname, '../../dist/client')))

const port = Number(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
