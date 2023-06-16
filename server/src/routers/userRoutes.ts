import { Router } from 'express'

const userRouter = Router()

import * as userController from '../controllers/userController'
import * as questionController from '../controllers/questionController'
import { registerEmail } from '../controllers/mailer'
import auth, { localVariables } from '../middleware/auth'

/** POST Methods */
userRouter.post('/register', userController.registerUser) // register user
userRouter.post('/register/mail', registerEmail) // send the email
userRouter.post('/authenticate', userController.verifyUser, userController.authenticateUser) //authenticate user
userRouter.post('/login', userController.verifyUser, userController.loginUser) // login user 

/** GET Methods */
userRouter.get('/:username', userController.getUser) // user with username
userRouter.get('/generate/OTP', userController.verifyUser, localVariables, userController.genarateOTP) // generate random otp
userRouter.get('/verify/OTP', userController.verifyOTP) // verify otp
userRouter.get('/create/ResetSession', userController.createResetSession) // reset all variables
userRouter.get('/health/questions', questionController.getQuestions)

/** UPDATE Methods */
userRouter.patch('/update', auth, userController.updateUser) // update user profile
userRouter.patch('/reset/password', userController.verifyUser, userController.resetPassword) // reset user password
userRouter.patch('/measure/bmi', userController.calculateBMI)

/** DELETE Methods */
userRouter.delete('/delete', userController.deleteUser) // delete user


export default userRouter