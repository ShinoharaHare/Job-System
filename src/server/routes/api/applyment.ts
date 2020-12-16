import { auth, required } from '@/server/middlewares'
import { Router } from 'express'

const router = Router()

router.post('/', auth, required('job', 'resume'), async(req, res) => {

})

router.get('/', auth, async(req, res) => {

})

router.post('/:id/accept', auth, async(req, res) => {

})

router.post('/:id/reject', auth, async(req, res) => {

})

router.post('/:id/confirm', auth, async(req, res) => {

})

router.post('/:id/abandon', auth, async(req, res) => {

})

export default router
