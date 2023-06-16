import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

/** Local Imports */
import {connect} from './database/conn'
import { config } from './config/config'
import routers from './routers'

const app = express()

/** middleware */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')

const port = config.server.port

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json({message: 'Home Get Request'})
})

/** API Routes */
app.use('/api/users', routers.userRouter)

/** Start Server only when we have valid database connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log('Cannot connect to server')
    }
}).catch((error) => {
    console.log('Invalid database connection....!', error)
})
