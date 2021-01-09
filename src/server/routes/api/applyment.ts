import { auth, required } from '@/server/middlewares'
import { Router } from 'express'
import { bossAcceptApplyment } from '@/server/applyment'
import { Types } from 'mongoose'

const router = Router()

router.post('/', auth, required('job', 'resume'), async(req, res) => {

})

router.get('/test', (req, res) => {
    bossAcceptApplyment(Types.ObjectId('5fd258253ec604545ce35e46'))
    res.json(
        'accept success'
    )
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
