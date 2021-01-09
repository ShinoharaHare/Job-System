import { Router } from 'express'
import testNots from './testNot'

const router = Router()

router.use('/testNots', testNots);

export default router
