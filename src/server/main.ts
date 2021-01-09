import config from './config'
import routes from './routes'

import express from 'express'
import cookieParser from 'cookie-parser'
import history from 'connect-history-api-fallback'

import * as path from 'path'
import './applyment'
import './AccountBackend'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/', routes)

app.use(history())
app.use(express.static(path.resolve(__dirname, '../../dist/client')))

const port = Number(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
