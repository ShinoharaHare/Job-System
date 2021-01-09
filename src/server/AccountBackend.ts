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
export const getVerCode = async(email: string) => {
    // const email = "00757001@email.ntou.edu.tw"
    const account = await Account.findOne({ email: email })
    if (account == null) {
        console.log('無此帳號')
        return 401
    }
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
            console.log(`error: ${error}`)
            return 404
        } else {
            console.log(`Message Sent ${info.response}`)
            return 200
        }
    });
    await Account.updateOne(
        { email: email },
        {
            $set: {
                resetPwd: {
                    code: validCode,
                    expired: (Date.now() + 10 * 60 * 1000)
                }
            }
        })
}

export const checkVerCode = async(email: string, code: string) => {
    const valid = await Account.distinct('resetPwd', { email: email })
    console.log(valid[0].code)
    if (Date.now() < valid[0].expired) { // 10*60*1000 = 十分鐘
        if (valid[0].code === code) {
            console.log('驗證碼正確')
            return 200
        } else {
            console.log('驗證碼錯誤')
            return 401// '驗證碼錯誤'
        }
    } else {
        console.log('驗證碼已過期')
        return 402// '驗證碼已過期'
    }
}
// 重設密碼
export const resetPassword = async(email: string, newHash: string) => {
    try {
        await Account.updateOne(
            { email: email },
            { $set: { hash: newHash } })

        console.log('密碼修改成功')
        return 200
    } catch (error) {
        return `error: ${error}`;
    }
}
// 刪除收藏工作
export const deleteFavorite = async(user: Types.ObjectId, job: Types.ObjectId) => {
    try {
        await Account.updateOne(
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
export const block = async(user: Types.ObjectId, blockedUser: Types.ObjectId) => {
    try {
        await Account.updateOne(
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
export const unblock = async(user: Types.ObjectId, blockedUser: Types.ObjectId) => {
    try {
        await Account.updateOne(
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
export const addResume = async(user: Types.ObjectId, name: string, content: string) => {
    try {
        await Account.updateOne(
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
export const deleteResume = async(user: Types.ObjectId, resume: Types.ObjectId) => {
    try {
        await Account.updateOne(
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

export const updateResume = async(user: Types.ObjectId, resume: Types.ObjectId, name: string, content: string) => {
    try {
        await Account.updateOne(
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

// getVerCode("hungjiewu@gmail.com")
checkVerCode('hungjiewu@gmail.com', '2BJkDe')
// resetPassword("hungjiewu@gmail.com","ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
