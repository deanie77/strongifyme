import { model, Schema, Model, Document } from 'mongoose'

export interface User extends Document {
  user_id: string
  user_name: string
  date_joined: Date
  email: string
  password: string
  age: Number
  height: Number
  weight: Number
  bmi: Number
  health_range: string
}

const UserSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  date_created: { type: Date, default: Date.now() },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const UserModel: Model<User> = model<User>('FitnessPlan', UserSchema)
