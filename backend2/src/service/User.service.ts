import { User } from '../model/User.model'
import { FitnessPlansRepository } from '../repository/FitnessPlans.repository'
import { UserRepository } from '../repository/User.repository'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUsers() {
    return await this.userRepository.getUsers()
  }

  async createUser(user: Object) {
    return await this.userRepository.createUser(user)
  }

  async findUser(email: string, password: string) {
    return await this.userRepository.findUser(email, password)
  }
}
