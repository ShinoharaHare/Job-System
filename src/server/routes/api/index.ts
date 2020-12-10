import { Router } from 'express'
import account from './account'
import job from './job'
import notification from './notification'

const router = Router()

router.use('/account', account)
router.use('/job', job);
router.use('/notification', notification)

export default router
