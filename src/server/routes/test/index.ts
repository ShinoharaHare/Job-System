import { Router } from 'express'
import testAccount from './testAccount'
import testNots from './testNot'

const router = Router()

router.use('/testAccount',testAccount);
router.use('/testNots', testNots);

export default router

