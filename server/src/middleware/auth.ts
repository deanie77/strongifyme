import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

/** Auth middleware */
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // access authorize header to validate request
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw token
        }

        const decodeToken = await jwt.verify(token, config.server.token.secret)

        req.body.user = decodeToken

        //res.json({decodeToken})

        next()
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed'})
    }
}

export const localVariables = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.app.locals = {
            OTP: null,
            resetSession: false
        }
        next()
    } catch (error) {
        console.log('error is here')
        res.send({error})        
    }
}

export default auth