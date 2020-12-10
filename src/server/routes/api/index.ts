import { Router } from 'express'
import account from './account'
import job from './job'

const router = Router()

router.use('/account', account)
router.use('/job', job);

export default router
