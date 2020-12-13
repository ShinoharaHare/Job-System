import { auth, required } from '@/server/middlewares'
import config from '@/server/config'
import { Account } from '@/server/models'

import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { login, mapSegment2Time } from '@/server/ntou-as'
import * as nodemailer from 'nodemailer'

const router = Router()

// 註冊
router.post('/', required('email', 'hash'), async(req, res) => {
    try {
        const account = await Account.create({
            email: req.body.email,
            hash: req.body.hash
        })
        res.status(201).json()
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ error: '帳號重複' })
        } else {
            res.status(500).json()
        }
    }
})

router.get('/', auth, async(req, res) => {
    const data: any = {}
    if (req.query.fields) {
        const fields = req.query.fields as string[]
        const account: any = req.account
        for (const f of fields) {
            data[f] = account[f]
        }
    } else {
        Object.assign(data, req.account)
    }

    delete data.hash

    res.status(200).json(data)
})

router.patch('/', auth, required('data'), async(req, res) => {
    // console.log({ ...req.body.data })
    await req.account!.updateOne({
        ...req.body.data
    })
    // req.account!.personal = req.body.data.personal
    // req.account!.markModified('personal')
    // let doc = await req.account!.save()
    res.status(200).json()
})

// 登入
router.post('/login', required('email', 'hash'), async(req, res) => {
    const account = await Account.findOne({
        email: req.body.email,
        hash: req.body.hash
    })

    if (account === null) {
        res.status(401).json({ error: '登入失敗' })
    } else {
        const token = jwt.sign({ id: account._id }, config.JWT_SECRET, { expiresIn: '1d' })

        res.status(200)
            .cookie('token', token)
            .json()
    }
})

// 忘記密碼
router.post('/findPWD', required('email'), async(req, res) => {
    const account = await Account.findOne({
        email: req.body.email
    })

    if (account === null) {
        res.status(404).json({ error: '無此帳號' })
    } else {
        const transporter = nodemailer.createTransport(
            'smtps://<username>%40gmail.com:<password>@smtp.gmail.com'
        );
        const mailOptions = {
            from: 'from_test@gmail.com',
            to: 'to_test@gmail.com',
            subject: 'Hello',
            text: 'Hello from node.js'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(400)
                    .json(`error: ${error}`)
            } else {
                res.status(200)
                    .json(`Message Sent ${info.response}`)
            }
        });
    }
})

// router.post('/comment', required('commentedID','content'), async(req, res) => {//commentedID被評論的ObjectID
//     const account = await Account.findOne({
//         commentedID: req.body.commentedID,
//         content: req.body.content
//     })
// })

router.post('/logout', auth, async(req, res) => {
    res.status(204).clearCookie('token').json()
})

router.post('/add-events', auth, required('events'), async(req, res) => {
    req.account!.events!.push(...req.body.events)
    const doc = await req.account!.save()
    res.status(200).json(doc)
})

router.post('/link-ntou', auth, required('ntouID', 'ntouPW'), async(req, res) => {
    try {
        const account = await login(req.body.ntouID, req.body.ntouPW)
        const personal = await account.personal.read()
        const courses = await account.course.listCurrent()

        const arr: any[] = []
        for (const course of courses) {
            arr.push({
                name: course.name,
                ...mapSegment2Time(Number(course.time.slice(1))),
                weekday: course.time[0]
            })
        }

        // req.account!.ntouStudentID = req.body.ntouID
        // req.account!.ntouPassword = req.body.ntouPW
        // req.account!.save()

        res.status(200).json({
            success: true,
            personal,
            courses: arr
        })
    } catch (error) {
        console.error(error)
        res.status(200).json({
            success: false
        })
    }
})

export default router
