import mongoose, { Document, Schema } from 'mongoose'

export interface IUser {
    username: string
    dateJoined: Date
    email: string
    password: string
    age: Number
    height: Number
    weight: Number
    bmi: Number
    healthRange: string
    profilePicture: string
    gender: string
  }

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide unique Username'],
        unique: [true, 'Username exists']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    email: {
        type: String,
        required: [true, 'Please provide a unique email'],
        unique: [true, 'Email already exists']
    },
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: String},
    address: {type: String},
    dateJoined: {type: Date, default: Date.now()},
    age: {type: Number},
    height: {type: Number},
    weight: {type: Number},
    bmi: {type: Number},
    healthRange: {type: String},
    dateOfBirth: {type: String},
    profilePicture: {type: String},
    gender: {type: String}
})

export default mongoose.model<IUserModel>('User', UserSchema)