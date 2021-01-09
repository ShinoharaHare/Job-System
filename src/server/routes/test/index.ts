import { Router } from 'express'
import testNots from './testNot'
import testTags from './testTags'

const router = Router()

router.use('/testNots', testNots);
router.use('/testTags', testTags);

export default router
