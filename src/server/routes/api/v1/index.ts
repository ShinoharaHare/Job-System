import { Router } from 'express'
import { Job } from '@/server/models'

const router = Router()

router.get('/job', async (req, res) => {
    const jobs = await Job.find({})

    res.json(jobs)
})

export default router
