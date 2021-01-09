import { Router } from 'express'
import testAccount from './testAccount'
const router = Router()

router.use('/testAccount',testAccount);

export default router

