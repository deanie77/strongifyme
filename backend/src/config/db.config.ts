import * as Mongoose from 'mongoose'
require('dotenv').config()

let database: Mongoose.Connection

export const connect = async () => {
  const url = 'mongodb+srv://deanmajaya:77detista@cluster0.y99gijv.mongodb.net/?retryWrites=true&w=majority'
  console.log('from connect: process.env.MONGO_CONNECTION_STRING :::', url)

  await Mongoose.connect(url, () => {
    try {
      console.log('connected to database...')
    } catch (err) {
      throw err
    }
  })
}

export const disconnect = async () => {
  await Mongoose.disconnect(() => {
    console.log('Disconnected from database...')
  })
}
