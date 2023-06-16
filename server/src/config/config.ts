import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.y99gijv.mongodb.net`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8001
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'deanmajaya'
const SERVER_ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'hatibatiketajamuka'
const SERVER_REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'hatibatiketajamuka'

const SERVER_MAIL = process.env.EMAIL
const SERVER_MAIL_PASSWORD = process.env.EMAIL_PASSWORD

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        token: {
            expireTime: SERVER_TOKEN_EXPIRETIME,
            issuer: SERVER_TOKEN_ISSUER,
            secret: SERVER_ACCESS_TOKEN_SECRET,
            r_secret: SERVER_REFRESH_TOKEN_SECRET
        },
        mail: {
            email: SERVER_MAIL,
            password: SERVER_MAIL_PASSWORD
        }
    }
}