import { Router } from 'express'
import testAccount from './testAccount'
import testNots from './testNot'
import testTags from './testTags'

const router = Router()

router.use('/testAccount',testAccount);
router.use('/testNots', testNots);
router.use('/testTags', testTags);

export default router

