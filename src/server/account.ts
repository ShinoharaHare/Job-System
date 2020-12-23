import { Types, Document } from 'mongoose'
import { Account, DAccount } from '@/server/models'
import * as nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import config from '@/server/config'

import { SubDocumentArray, SubDocument, SubDocumentArrayNoId, SubDocumentNoId } from 'ts-mongoose/types/_shared'

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// 忘記密碼
export const findPwd = async(email: string) => {
    // const email = "00757001@email.ntou.edu.tw"
    const user = await Account.findOne({ email: email })
    const validCode = makeid(6)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hungjiewu@gmail.com',
            pass: 'vwlspvrrtewwzcga'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: '"小雞雞上工" <hungjiewu@gmail.com>',
        to: email,
        subject: '帳號重設連結',
        html: `<h2>請使用以下驗證碼來重設密碼</h2>
                <h4 style="color:red;">請在10分鐘內完成驗證動作</h4>
                <h3 style="color:blue;">${validCode}</h3>`
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(`error: ${error}`);
        } else {
            console.log(`Message Sent ${info.response}`);
        }
    });
    user!.resetPwd!.code = validCode
    user!.resetPwd!.expired = new Date()
}

export const checkValidation = async(email: string, code: string) => {
    const user = await Account.findOne({ email: email })
    const nowTime = new Date()
    console.log(user!.resetPwd!.expired)
    console.log(user!.resetPwd!.code)
    if (user!.resetPwd!.expired!.getTime() > Date.now() - 10 * 60 * 1000) { // 10*60*1000 = 十分鐘
        if (user!.resetPwd!.code === code) {
            console.log('驗證碼正確')
            return true
        } else {
            console.log('驗證碼錯誤')
            return false// '驗證碼錯誤'
        }
    } else {
        return false// '驗證碼已過期'
    }
}
// 重設密碼
export const resetPassword = async(email: string, newHash: string) => {
    try {
        Account.update(
            { email: email },
            { $set: { hash: newHash } })
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

// findPwd("hungjiewu@gmail.com")
// checkValidation("hungjiewu@gmail.com","dKHOWB")
