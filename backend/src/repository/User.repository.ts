import { connect } from '../config/db.config'
import { UserModel } from '../model/User.model'

export class UserRepository {
  constructor() {
    connect()
  }

  async getUsers() {
    const users = await UserModel.find({})
    console.log('users:::', users)
    return users
  }
}
