import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Logging from '../library/Logging'

import User from '../models/User'
import signJWT from '../utils/signJWT'

const saltRounds = 10
const NAMESPACE = 'Users'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info(`${NAMESPACE}:: Token validated, user authorized`)

    return res.status(200).json({
        message: 'Authorized'
    })
}

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    User.find({email})
    .exec()
    .then(users => {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        if (bcrypt.compareSync(password, users[0].password)) {
            signJWT.signAccessJWT(users[0], (_error, token) => {
                if(_error) {
                    Logging.error(`${NAMESPACE} Unable to sign token ${_error}`)

                    return res.status(401).json({
                        message: 'Unauthorized',
                        error: _error
                    })
                } else if (token) {
                    signJWT.signRefreshJWT(users[0], (error, _token) => {
                        if(error) {
                            Logging.error(`${NAMESPACE} Unable to sign token ${error}`)
        
                            return res.status(401).json({
                                message: 'Unauthorized',
                                error: error
                            })
                        } else if (_token) {
                            try {
                                User.updateOne({'email': users[0].email}, {$set: {'refreshtoken': _token}})
                                return res.status(200).json({
                                    message: 'Auth Successful',
                                    token,
                                    user: users[0]
                                })
                            } catch (error) {
                                console.log(error)
                                
                            }
                           
                        }
                    })
                    
                }
            })
        } else {
            Logging.error(`${NAMESPACE}:: Passwords did not match`)

            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const hash = bcrypt.hashSync(req.body.password, saltRounds)

    const newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hash
    })

    return newUser
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch(error => res.status(500).json({ error }))
}

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(400).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }))
}
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .select('-password')
        .then((users) => res.status(200).json({ users, count: users.length }))
        .catch((error) => res.status(500).json({ error }))
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body)

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json(error))
            } else {
                res.status(404).json({ message: 'Not found' })
            }
        })
        .catch((error) => res.status(500).json({ error }))
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId

    return User
        .findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
}

export default { createUser, getUser, getAllUsers, updateUser, deleteUser, validateToken, loginUser }