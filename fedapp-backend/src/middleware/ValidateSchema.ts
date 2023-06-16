import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'
import { IUser } from '../models/User'

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body)

            next()
        } catch (error) {
            Logging.error(error)
            return res.status(422).json({error})
        }
    }
}

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            user_name: Joi.string().regex(/^([a-zA-Z0-9_-]){6,12}$/).required(),
            email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
            password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required()
        }),

    }
}