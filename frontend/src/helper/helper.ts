import axios from 'axios'
import { data } from 'browserslist'

/** Make API Requests */
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

/** authenticate function */
export const authenticateUser = async (username: string) => {
    try {
        return await axios.post('/api/users/authenticate', {username})
    } catch (error) {
        return { error: 'Username does not exist' }
    }
}

/** Get user details */
export const getUser = async (username: any) => {
    try {
        const { data } = await axios.get(`/api/users/${username}`)
        return { data }
    } catch (error) {
        return {error}
    }
}

/** Register User */
export const registerUser = async (credentials: any) => {
    try {
        const { data: { message }, status } = await axios.post('/api/users/register', credentials)

        let { username, email } = credentials

        /** send email */
        if(status === 201) {
            await axios.post('/api/users/register/mail', { username, userEmail: email })
        }

        return Promise.resolve(data.message)
    } catch (error) {
        return Promise.reject({ error })
    }    
}

/** User Login */
export const userLogin = async (email: string, password: string) => {
    try {
        if(email) {
            const data = await axios.post('/api/users/login', { email, password })
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Update User */
export const updateUser = async (response: any) => {
    try {
        const token = await localStorage.getItem('token')
        const data = await axios.patch('/api/users/update', response, { headers: { 'Authorization': `Bearer ${token}` } })

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Generate OTP */
export const generateOTP = async (username: string) => {
    try {
        const { data: { code }, status } = await axios.get('/api/users/generate/OTP', { params: { username } })

        /** Send mail with the OTP */
        if(status === 201) {
            let { data: { email } } = await getUser({ username })
            let text = `Your password recovery OTP is ${code}. Verify and recover your password`
            await axios.post('/api/register/mail', { username, userEmail: email, text, subject: 'Password Recovery' })
        }

        return Promise.resolve({code})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export const verifyOTP = async ({ username, code }: any) => {
    try {
        const { data, status } = await axios.get('/api/users/verify/OTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject({error})
    }
}

export const resetPassword = async ({ email, password }: any) =>{
    try {
        const {data, status} = await axios.patch('/api/users/reset/password', { email, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}