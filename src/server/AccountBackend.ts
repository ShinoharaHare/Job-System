import { Types, Document } from 'mongoose'
import { Account, DAccount, Job } from '@/server/models'
import * as nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import config from '@/server/config'

import { SubDocumentArray, SubDocument, SubDocumentArrayNoId, SubDocumentNoId } from 'ts-mongoose/types/_shared'

export function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// 忘記密碼
export const getVerCode = async (email: string) => {
    // const email = "00757001@email.ntou.edu.tw"
    console.log(email)
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
            //return 401
        }
    });
    const res = await Account.findOneAndUpdate(
        { email: email },
        {
            $set: {
                resetPwd: {
                    code: validCode,
                    expired: (Date.now() + 10 * 60 * 1000)
                }
            }
        })
    if (res) {
        return 200
    }
    else {
        console.log('無此帳號')
        return 401
    }
}

export const checkVerCode = async (email: string, code: string) => {
    const valid = await Account.distinct('resetPwd', { email: email })
    console.log(email)
    if (Date.now() < valid[0]?.expired) { // 10*60*1000 = 十分鐘
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
export const resetPassword = async (email: string, newHash: string) => {
    try {
        const res = await Account.findOneAndUpdate(
            { email: email },
            { $set: { hash: newHash } })
        if (res) {
            console.log('密碼修改成功')
            return 200
        } else {
            console.log('Not Exist')
            return 401
        }
    } catch (error) {
        console.log(`error: ${error}`)
        return 404;
    }
}
// 新增收藏工作
export const addFavorite = async (user: Types.ObjectId, jobID: Types.ObjectId) => {
    try {
        const job = await Job.findOne({ _id: jobID })
        if (job == null) {
            console.log("工作不存在")
            return 401
        }
        const res = await Account.findOneAndUpdate(
            { _id: user },
            {
                $push: {
                    favorite: jobID
                }
            })
        if (res) {
            return 200
        } else {
            console.log("帳號不存在")
            return 402
        }
    } catch (error) {
        return 404;
    }
}
// 刪除收藏工作
export const deleteFavorite = async (user: Types.ObjectId, jobID: Types.ObjectId) => {
    try {
        const res = await Account.findOneAndUpdate(
            { _id: user },
            {
                $pull: {
                    favorite: jobID
                }
            })
        if (res) {
            return 200
        } else {
            console.log("roor")
            return 401
        }
    } catch (error) {
        return 404;
    }
}
// 新增黑名單帳號
export const block = async (user: Types.ObjectId, blockedUserID: Types.ObjectId) => {
    try {
        const blockUser = await Account.findOne({ _id: blockedUserID })
        if (blockUser == null) {
            console.log("帳號不存在")
            return 401
        }
        const res = await Account.findOneAndUpdate(
            { _id: user },
            {
                $push: {
                    blacklist: blockedUserID
                }
            })
        if (res) {
            return 200
        } else {
            return 401
        }
    } catch (error) {
        return 404;
    }
}
// 刪除黑名單帳號
export const unblock = async (user: Types.ObjectId, blockedUser: Types.ObjectId) => {
    try {
        const res = await Account.findOneAndUpdate(
            { _id: user },
            {
                $pull: {
                    blacklist: blockedUser
                }
            })
        if (res) {
            return 200
        } else {
            return 401
        }
    } catch (error) {
        return 404;
    }
}
// 新增履歷
export const addResume = async (user: Types.ObjectId, name: string, content: string) => {
    try {
        const res = await Account.findOneAndUpdate(
            { _id: user },
            {
                $push: {
                    resumeTemplates: { name: name, content: content }
                }
            })
        if (res) {
            return 201
        } else {
            return 401
        }
    } catch (error) {
        return 404;
    }
}
// 刪除履歷
export const deleteResume = async (user: Types.ObjectId, resume: string) => {
    try {
        const res = await Account.findOneAndUpdate(
            { _id: user },
            {
                $pull: {
                    resumeTemplates: { _id: resume }
                }
            })
        if (res) {
            console.log("delete Success!")
            return 204
        } else {
            return 401
        }
    } catch (error) {
        return 404
    }
}

export const updateResume = async (user: Types.ObjectId, resume: string, name: string, content: string) => {
    try {
        const res = await Account.findOneAndUpdate(
            { _id: user, 'resumeTemplates._id': resume },
            {
                $set: {
                    'resumeTemplates.$.name': name,
                    'resumeTemplates.$.content': content
                }
            })
        if (res) {
            return 200
        } else {
            return 401
        }
    } catch (error) {
        return 404;
    }
}

// export const test = async() => {
//     const jobs = await Job.find()
//     console.log(jobs)
// }
// test()

// getVerCode("hungjiewu@gmail.com")
// checkVerCode('hungjiewu@gmail.com', '2BJkDe')
// resetPassword("hungjiewu@gmail.com","ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
//addResume(Object("5fe3444644aeb23ee87a38d8"),"test12","1234")
//deleteResume(Object("5fe3444644aeb23ee87a38d8"),Object("5ff968a0e7a40919942051cf"))