import { Router } from 'express'
import testAccount from './testAccount'
const router = Router()

router.use('/testAccount',testAccount);
import testNots from './testNot'
import testTags from './testTags'



router.use('/testNots', testNots);
router.use('/testTags', testTags);

export default router

