import { FitnessPlansService } from '../service/FitnessPlans.service'
import { UserService } from '../service/User.service'
import { logger } from '../utils/Logger'

export class UserController {
  public userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async getUsers() {
    logger.info('Controller: getUsers', null)
    return await this.userService.getUsers()
  }
}
