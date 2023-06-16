import jwt from 'jsonwebtoken'

import { config } from '../config/config'
import Logging from '../library/Logging'
import { IUser } from '../models/User'

const NAMESPACE = 'Auth'

const signRefreshJWT = (user: IUser, callback: (error: Error|null, token: string|null) => void) : void => {
    const timeSinchEpoch = new Date().getTime()
    const expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000)

    Logging.info(`${NAMESPACE}:: Attempting to sign to for ${user.email}`)

    try {
        jwt.sign(
            {
                email: user.email    
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null)
                } else if (token) {
                    callback(null, token)
                }
            }
        )
    } catch (error) {
        Logging.error(error)
    }
}

const signAccessJWT = (user: IUser, callback: (error: Error|null, token: string|null) => void) : void => {
    Logging.info(`${NAMESPACE}:: Attempting to sign to for ${user.email}`)

    try {
        jwt.sign(
            {
                email: user.email    
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: '2m'
            },
            (error, token) => {
                if (error) {
                    callback(error, null)
                } else if (token) {
                    callback(null, token)
                }
            }
        )
    } catch (error) {
        Logging.error(error)
    }
}

export default { signRefreshJWT, signAccessJWT } 