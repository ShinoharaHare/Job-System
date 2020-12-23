import { auth, required } from '@/server/middlewares'
import { Router } from 'express'
import { bossRefuseApplyment } from '@/server/applyment'
import { Types } from 'mongoose'

const router = Router()

router.post('/', auth, required('job', 'resume'), async(req, res) => {

})

router.get('/test', (req, res) => {
    bossRefuseApplyment(Types.ObjectId('5fde0206359f4c512ce389be'))
    res.json(
        'refuse success'
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
