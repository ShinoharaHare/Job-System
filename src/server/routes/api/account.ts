import { auth, required } from '@/server/middlewares'
import config from '@/server/config'
import { Account } from '@/server/models'

import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { login, mapSegment2Time } from '@/server/ntou-as'

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

router.post('/logout', auth, async(req, res) => {
    res.status(204).clearCookie('token').json()
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
