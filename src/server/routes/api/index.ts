import { Router } from 'express'
import account from './account'
import job from './job'
import notification from './notification'
import applyment from './applyment'

const router = Router()

router.use('/account', account)
router.use('/job', job);
router.use('/notification', notification)
router.use('/applyment', applyment)

export default router
