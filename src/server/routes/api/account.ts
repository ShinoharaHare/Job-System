import { auth, required } from '@/server/middlewares'
import config from '@/server/config'
import { Account } from '@/server/models'

import { Router } from 'express'
import jwt from 'jsonwebtoken'

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

router.post('/link', auth, async(req, res) => {
    res.json()
})

export default router
