import { auth, required } from '@/server/middlewares'
import config from '@/server/config'
import { Account } from '@/server/models'

import { Router } from 'express'

const router = Router()

router.post('/list', auth, async(req, res) => {
    res.json(req.account?.notification);
})

router.get('/test', async(req, res) => {
    const users = ['5fd0eeb94dd4a0504478a60f', '5fc7c26ad9008562403f7281'];

    const result = await Account.find({
        _id:
                        '5fd0eeb94dd4a0504478a60f'

    });
    console.log(result);
    res.json({ msg: 'fuck' });
})

export default router
