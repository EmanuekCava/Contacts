import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.set('port', process.env.PORT)

import contactRoute from './routes/contact.routes'

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(contactRoute)

app.listen(app.get('port'), () => {
    console.log("Server on port:", app.get('port'));
})