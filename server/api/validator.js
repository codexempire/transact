import bcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export const passwordComparer = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

export const signToken = data => jwt.sign(data, process.env.SECRET_KEY)

export const hashedPassword = password => bcrypt.hash(password, 10)

const createTransport = () => (
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yandex.code@gmail.com',
            pass: 'newman00'
        }
    })
)

export const sendMail = (mailOptions) => {
    const transporter = createTransport();
    return transporter.sendMail(mailOptions)
}