import { Types } from 'mongoose'
import { Account } from '@/server/models'
import * as nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import config from '@/server/config'

// 忘記密碼
export const findPwd = (email: string) => {
    const account = Account.findOne({
        email: email
    })

    if (account === null) {
        return 404;
    } else {
        const transporter = nodemailer.createTransport(
            'smtps://<username>%40gmail.com:<password>@smtp.gmail.com'
        );
        // const token = jwt.sign({ id: account._id }, config.RESET_PASSWORD, { expiresIn: '20m' })
        const mailOptions = {
            from: '00757001@email.ntou.edu.tw',
            to: email,
            subject: '帳號重設連結',
            html: `
                <h2>請點擊以下連結來重設密碼</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/</p>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return `error: ${error}`;
            } else {
                return `Message Sent ${info.response}`;
            }
        });
    }
}

// export const comment
// 重設密碼
export const resetPassword = (user: Types.ObjectId, hash: string) => {
    try {
        Account.update({ _id: user }, { $set: { hash: hash } })
        return 200
        // res.status(200).json()
    } catch (error) {
        return `error: ${error}`;
    }
}
// 新增收藏工作
export const addFavorite = (user: Types.ObjectId, job: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $push: {
                    favorite: job
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
// 刪除收藏工作
export const deleteFavorite = (user: Types.ObjectId, job: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $pull: {
                    favorite: job
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
// 新增黑名單帳號
export const block = (user: Types.ObjectId, blockedUser: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $push: {
                    blacklist: blockedUser
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
// 刪除黑名單帳號
export const unblock = (user: Types.ObjectId, blockedUser: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $pull: {
                    blacklist: blockedUser
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
// 新增履歷
export const addResume = (user: Types.ObjectId, name: string, content: string) => {
    try {
        Account.update(
            { _id: user },
            {
                $push: {
                    resumeTemplates: { _id: {}, name: name, content: content }
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
// 刪除履歷
export const deleteResume = (user: Types.ObjectId, resume: Types.ObjectId) => {
    try {
        Account.update(
            { _id: user },
            {
                $pull: {
                    resumeTemplates: resume
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}

export const updateResume = (user: Types.ObjectId, resume: Types.ObjectId, name: string, content: string) => {
    try {
        Account.update(
            { _id: user, 'resumeTemplates._id': resume },
            {
                $set: {
                    'resumeTemplates.$.name': name,
                    'resumeTemplates.$.content': content
                }
            })
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
