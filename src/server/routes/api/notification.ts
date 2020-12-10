import { auth, required } from '@/server/middlewares'
import config from '@/server/config'
import { Account } from '@/server/models'

import { Router } from 'express'
import { sendNots, messageSetRead } from '@/server/notification'

const router = Router()

// 取得已登錄用戶的所有通知訊息，回傳JSON
router.post('/list', auth, async(req, res)=>{
    res.json(req.account?.notification);
})

router.post('/test', async(req, res) => {
    const users = ['5fd0eeb94dd4a0504478a60f', '5fc7c26ad9008562403f7281'];

    console.log(sendNots(['5fc85a78ded8cd5ea864a034'], "test msg123", "ignore this messsege\nsend to test@test.test\n"));
    res.json({ msg: 'success'});
})

export default router