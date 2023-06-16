import bcrypt from 'bcrypt'

import { connect } from '../config/db.config'
import { User, UserModel } from '../model/User.model'
import signJWT from '../utils/signJWT'

export class UserRepository {
  constructor() {
    connect()
  }

  async getUsers() {
    const users = await UserModel.find({})
    console.log('users:::', users)
    return users
  }

  async createUser(user: Object) {
    const newUser = new UserModel(user)
    newUser.save()
    console.log('new user created:::', newUser)
    return newUser  
  }

  async findUser(email: string, password: string) {
    await UserModel.findOne({email: email}, (err: Error, foundUser: User) => {
      if (err) {
        console.log(err)
      } else {
        if (bcrypt.compareSync(password, foundUser.password)) {
          signJWT(foundUser, (_error, token) => {
            if (_error) {
              return _error
            } else if(token) {
              return {token, foundUser}
            }
          })
      }
      }
    })
  }
}
