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
}
