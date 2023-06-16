import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { UserController } from '../controller/user.controller'
import signJWT from '../utils/signJWT'

const userController: UserController = new UserController
const saltRounds = 10

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
        message: 'Authorized'
    })
}

const registerUser = (req: Request, res: Response, next: NextFunction) => {
    const {user_name, email, password} =  req.body

    const hash = bcrypt.hashSync(password, saltRounds)

    const newUser = {
        user_name: user_name,
        email: email,
        password: hash
    }

    return userController.createUser(newUser).then(user => {
        return res.status(201).json({user})
    }).catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    let {email, password} = req.body
    userController.findUser(email, password).then(user => {
        return res.status(200).json({
            message: 'Auth Successful',
            user
        })
    }).catch(error => {
        return res.status(401).json({
            message: 'Unauthorized',
            error: error
        })
    })
    
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    
}

export default { registerUser, loginUser, validateToken, getAllUsers }