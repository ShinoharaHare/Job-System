import { auth, required } from '@/server/middlewares'
import config from '@/server/config'
import { Account } from '@/server/models'

import { Router } from 'express'
import { sendNots, messageSetRead } from '@/server/notification'

import { Types } from 'mongoose'

const router = Router()

router.post('/list', auth, async(req, res) => {
    res.json(req.account?.notification);
})

export default router
