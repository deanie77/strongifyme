import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _, { result } from 'lodash'
import otpGenerator from 'otp-generator'

import UserModel, { IUser } from '../models/UserModel'
import { config } from '../config/config'

/** middleware for verify user */
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.method == 'GET' ? req.query : req.body
        const { email } = req.method == 'GET' ? req.query : req.body

        let exist = await UserModel.findOne({ username })
        console.log('Stopping here')
        if(!exist) return res.status(404).send({error: 'Can\'t find user!'})
        next()
    } catch (error) {
        return res.status(404).send({error: 'Authentication Error'})
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { profilePicture, username, email, password } = req.body

        // check if username exists
        const checkUsername = new Promise((resolve, reject) => {
            UserModel.findOne({username})
            .then(user => {
                if(user) reject({error: 'Please use unique username'})
                resolve(user)
            })
            .catch(error => {
                if(error) reject(new Error(error))
            })
        })

        // check if email exists
        const checkEmail = new Promise((resolve, reject) => {
            UserModel.findOne({email})
            .then(user => {
                if(user) reject({error: 'Please use unique username'})
                resolve(user)
            })
            .catch(error => {
                if(error) reject(new Error(error))
            })
        })

        Promise.all([checkUsername, checkEmail])
        .then(() => {
            if(password) {
                bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    const user = new UserModel({
                        profilePicture: profilePicture || '',
                        username,
                        email,
                        password: hashedPassword
                    })

                    // return save result as a response
                    user.save()
                    .then(result => res.status(201).send({message: 'User rgistered successfully'}))
                    .catch(error => res.status(500).send({error}))
                }).catch(error => {
                    return res.status(500).send({
                        error: 'Unable to hash password'
                    })
                })
            }
        }).catch(error => {
            console.log('promise not working')
            console.log(error);
            
            return res.status(500).send({error})
        })
    } catch (error) {
        console.log('register user not working')
        
        return res.status(500).json({error})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        UserModel.findOne({email})
        .then(user => {
            bcrypt.compare(password, user?.password || '')
            .then(passwordCheck => {
                if(!passwordCheck) return res.status(400).send({error: 'Wrong password'})

                // create jwt token
                const token = jwt.sign(
                    {
                        userId: user?._id,
                        username: user?.username
                    },
                    config.server.token.secret,
                    {
                        expiresIn: "24h"
                    }
                )

                return res.status(200).send({
                    message: 'Login Successful',
                    username: user?.username,
                    token
                })
            })
            .catch()
        })
        .catch(error => {
            return res.status(404).send({error: 'Username not Found'})
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { username } = req.params

    try {
        if(!username) return res.status(501).send({ error: 'Invalid Username' })

        UserModel.findOne({ username })
        .select(['-password', '-dateJoined'])
        .then(user => {
            console.log('We are here')
            
            if(!user) return res.status(501).send({ error: 'Couldn\'t Find the User' })

            return res.status(201).send(user)
        }).catch(error => {
            return res.status(500).send({error})
        })
    } catch (error) {
        return res.status(404).send({ error: 'Can\'t Find User Data' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        // const id = req.query.id
        const { userId } = req.body.user

        if (userId) {
            const body = req.body

            // update user data
            UserModel.updateOne({_id: userId}, body)
            .then((data) => {
                return res.status(201).json({message: 'Record Updated...!', data})
            })
            .catch(err => {
                throw err
            })
        } else {
            return res.status(401).send({ error: 'User Not Found ...!' })
        }
    } catch (error) {
        return res.status(401).send({ error })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    res.json("Delete")
}

export const genarateOTP = async (req: Request, res: Response) => {
    try {
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        res.status(201).send({ code: req.app.locals.OTP })
    } catch (error) {
        console.log(error, 'this is the error')  
    }
}

export const verifyOTP = (req: Request, res: Response) => {
    const { code } = req.query
    if(parseInt(req.app.locals.OTP) === parseInt(code?.toString() ?? '')) {
        req.app.locals.OTP = null
        req.app.locals.resetSession = true
        return res.status(201).send({ message: 'Verification Successful!' })
    }
    return res.status(400).send({ error: 'Invalid OTP' })
}

export const createResetSession = async (req: Request, res: Response) => {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false
        return res.status(201).send({message: 'access granted!'})
    }
    return res.status(440).send({error: 'Session expired!'})
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        if(!req.app.locals.resetSession) return res.status(440).send({ error: 'Session expired!' })

        const { username, password } = req.body

        try {
            UserModel.findOne({ username })
            .then(user => {
                bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    UserModel.updateOne({ username: user?.username }, {password: hashedPassword})
                    .then(result => {
                        return res.status(201).send({messsage: 'Record Updated...!'})
                    })
                    .catch(error => {
                        return res.status(400).send({message: 'Unable to change password'})
                    })
                })
                .catch(e => {
                    return res.status(500).send({error: 'Unable to hash password'})
                })
            })
            .catch(error => {
                return res.status(404).send({ error: 'username not found' })
            })
        } catch (error) {
            return res.status(500).send({ error })
        }
    } catch (error) {
        return res.status(401).send({ error })
    }
}

export const authenticateUser = async (req: Request, res: Response) => {
    res.end()
}

export const calculateBMI = async (req: Request, res: Response) => {
    try {
        const { username, height, weight, bmi, healthRange } = req.body
        UserModel.findOneAndUpdate({username}, {
            height: height,
            weight: weight,
            bmi: bmi,
            healthRange: healthRange
        }).then(result => { console.log(result);
         return res.status(201).send({result})})
        .catch(error => res.status(400).json(error))
    } catch (error) {
        return res.status(400).json({error})
    }
}