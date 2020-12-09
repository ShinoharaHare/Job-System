import { Router } from 'express'
import account from './account'
import notification from './notification'

const router = Router()

router.use('/account', account)
router.use('/notification', notification)

export default router
