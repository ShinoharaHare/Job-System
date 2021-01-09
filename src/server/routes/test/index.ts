import { Router } from 'express'
import testAccount from './testAccount'
const router = Router()

router.use('/testAccount',testAccount);
import testNots from './testNot'



router.use('/testNots', testNots);

export default router

