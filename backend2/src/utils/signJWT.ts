import jwt from 'jsonwebtoken'
import { config } from "../config/config";
import { User } from "../model/User.model";

const signJWT = (user: User, callback: (error: Error | null, token: string | null) => void): void => {
    let timeSinchEpoch = new Date().getTime();
    let expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000
    let expirationTimeInSeconds = Math.floor(expirationTime / 1000)

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
                }
                else if (token) {
                    callback(null, token)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export default signJWT