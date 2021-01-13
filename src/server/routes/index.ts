import api from './api'
import test from './test'

import { Router } from 'express'

const router = Router()

router.use('/api', api)
router.use('/test', test)

export default router
