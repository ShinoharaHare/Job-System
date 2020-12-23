import { Types } from 'mongoose'
import { Account } from '@/server/models'
import * as nodemailer from 'nodemailer'

// 忘記密碼
export const findPwd = (email: string) => {
    const account = Account.findOne({
        email: email
    })

    if (account === null) {
        console.log(404)
        // res.status(404).json({ error: '無此帳號' })
    } else {
        const transporter = nodemailer.createTransport(
            'smtps://<username>%40gmail.com:<password>@smtp.gmail.com'
        );
        const mailOptions = {
            from: '00757001@email.ntou.edu.tw',
            to: email,
            subject: '帳號重設連結',
            text: 'Hello from node.js'
        };
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return console.log(`error: ${error}`);
                // res.status(400)
                //     .json(`error: ${error}`)
            } else {
                console.log(`Message Sent ${info.response}`);
                // res.status(200)
                //     .json(`Message Sent ${info.response}`)
            }
        });
    }
}

export const resetPassword = (user: Types.ObjectId, hash: string) => {
    try {
        Account.update({ _id: user }, { $set: { hash: hash } })
        console.log(200)
        // res.status(200).json()
    } catch (error) {
        return console.log(`error: ${error}`);
        // res.status(400)
        //     .json(`error: ${error}`)
    }
}

export const addFavorite = (user: Types.ObjectId, job: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $push: {
                    favorite: job
                }
            })
        console.log(200)
        // res.status(200).json()
    } catch (error) {
        return console.log(`error: ${error}`);
        // res.status(400)
        //     .json(`error: ${error}`)
    }
}

export const deleteFavorite = (user: Types.ObjectId, job: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $pull: {
                    favorite: job
                }
            })
        console.log(200)
        // res.status(200).json()
    } catch (error) {
        return console.log(`error: ${error}`);
        // res.status(400)
        //     .json(`error: ${error}`)
    }
}
