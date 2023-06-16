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

  async createUser(user: Object) {
    logger.info('Controller: createUser', user)
    return await this.userService.createUser(user)
  }

  async findUser(email: string, password: string) {
    logger.info('Controller: findUser by email', email)
    return await this.userService.findUser(email, password)
  }
}
