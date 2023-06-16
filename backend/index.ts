import * as bodyParser from 'body-parser'
import express, { Express, Request, Response } from 'express'
import expressPinoLogger from 'express-pino-logger'
import dotenv from 'dotenv'

import { logger } from './src/utils/Logger'
// import { FitnessPlanController } from '../src/controller/fitness_plans.controller'
// import { UserController } from './src/controller/user.controller'

dotenv.config()

const app: Express = express()
const port = process.env.BACKEND_PORT || 8001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressPinoLogger({ logger: logger }))

// const fitnessPlanController: FitnessPlanController
// const userController: UserController = new UserController

app.get('/', (req: Request, res: Response) => {
  res.send('Your server is running')
})

// app.get('/api/fitness_plans', (req, res) => {
//   fitnessPlanController.getFitnessPlans().then((data) => res.json(data))
// })

// app.get('/api/users', (req, res) =>{
//   userController.getUsers().then((data) => res.json(data))
// })

// handling undefined routes
app.use('*', (req, res, next) => {
  res.status(404)
  res.json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
