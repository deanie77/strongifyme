// const bodyParser = require('body-parser')
// const express = require('express')
// const expressPinoLogger = require('express-pino-logger')
// const dotenv = require('dotenv')

import bodyParser from 'body-parser'
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import expressPinoLogger from 'express-pino-logger'
import bcrypt from 'bcrypt'

import { logger } from './utils/Logger'
import { FitnessPlanController } from './controller/fitness_plans.controller'
import { UserController } from './controller/user.controller'
import userRoutes from './routes/user.routes'

dotenv.config()

const app: Express = express()
const router = express.Router()

const port = process.env.BACKEND_PORT || 8001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressPinoLogger({ logger: logger }))

const fitnessPlanController: FitnessPlanController = new FitnessPlanController
const userController: UserController = new UserController

const saltRounds = 10

app.get('/', (req: Request, res: Response) => {
  res.send('Your server is running')
})

app.get('/api/fitness_plans', (req, res) => {
  fitnessPlanController.getFitnessPlans().then((data) => res.json(data))
})

app.get('/api/users', (req: Request, res: Response) => {
  userController.getUsers().then((data) => res.json(data))
})

// app.post('/api/users/register', async (req: Request, res: Response) => {

//   const hash = bcrypt.hashSync(req.body.password, saltRounds)
//   const newUser = {
//     user_name: req.body.user_name,
//     email: req.body.email,
//     password: hash
//   }

//   userController.createUser(newUser).then((user) => res.json(user)).catch((e) => console.log(e))
// })

app.post('/api/users/register', userRoutes.registerUser)
app.get('/validate', userRoutes.validateToken)
app.post('/api/users/login', userRoutes.loginUser)

// handling undefined routes
app.use('*', (req, res, next) => {
  res.status(404)
  res.json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
