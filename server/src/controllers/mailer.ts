import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { config } from '../config/config'
import { Request, Response } from 'express'

let nodeConfig = {
    service: 'gmail',
    auth: {
      user: config.server.mail.email, // generated ethereal user
      pass: config.server.mail.password, // generated ethereal password
    }
}

let transport = nodemailer.createTransport(nodeConfig)

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "FedApp",
        link: "https://providencehumancapital.com/"
    }
})

export const registerEmail = async (req: Request, res: Response) => {
    const { username, userEmail, text, subject } = req.body

    let email = {
        body: {
            name: username,
            intro: text || 'Welcome to FedApp! We are excited to have you on board',
            outro: 'Need help, or have a question? Just reply to this email, we\'d love to help'
        }
    }

    let emailBody = MailGenerator.generate(email)

    let message = {
        from: config.server.mail.email,
        to: userEmail, 
        subject: 'Welcome to FedApp',
        html: emailBody
    }

    transport.sendMail(message)
    .then(() => {
        return res.status(200).send('Email has been sent to your account')
    })
    .catch(error => res.status(500).send({ error }))
}