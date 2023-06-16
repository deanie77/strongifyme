import { model, Schema, Model, Document } from 'mongoose'

export interface User extends Document {
  user_name: string
  date_joined: Date
  email: string
  password: string
  age: Number
  height: Number
  weight: Number
  bmi: Number
  health_range: string
  profile_picture: string
}

const UserSchema: Schema = new Schema({
  user_name: { type: String, required: true },
  date_joined: { type: Date, default: Date.now() },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: {type: Number, default: 0},
  height: {type: Number, default: 0},
  weight: {type: Number, default: 0},
  bmi: {type: Number, default: 0},
  health_range: {type: String, default: ''},
  profile_picture: {data: Buffer, contentType: String}
})

export const UserModel: Model<User> = model<User>('User', UserSchema)
