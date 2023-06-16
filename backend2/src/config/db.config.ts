import * as Mongoose from 'mongoose'
import { config } from './config'
require('dotenv').config()

let database: Mongoose.Connection

export const connect = async () => {
  await Mongoose.connect(config.mongo.url)
  .then(() => {
    console.log('from connect: process.env.MONGO_CONNECTION_STRING :::')
  })
  .catch(error => {
    console.log(error)
    
  })
}

export const disconnect = async () => {
  await Mongoose.disconnect()
}
