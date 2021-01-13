import { auth, required } from '@/server/middlewares'
import * as Applyment from '@/server/applyment'

import { Router } from 'express'
import { Account } from '@/server/models'

const router = Router()

router.post('/', auth, required('job', 'resume'), async (req, res) => {
    let result = await Applyment.apply({
        job: req.body.job,
        resume: req.body.resume,
        applicant: req.account!.id
    })

    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(201).json(result)
    }
})

router.get('/', auth, async (req, res) => {
    let result: any
    if (req.query.job) {
        result = await Applyment.findByJob(req.query.job as string)
    } else {
        result = await Applyment.findByApplicant(req.account!.id)
    }

    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(200).json(result)
    }
})

router.get('/', async (req, res) => {

})

router.post('/:id/accept', auth, async (req, res) => {
    let result = await Applyment.accept(req.params.id)
    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(200).json(result)
    }
})

router.post('/:id/reject', auth, async (req, res) => {
    let result = await Applyment.reject(req.params.id)
    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(200).json(result)
    }
})

router.post('/:id/confirm', auth, async (req, res) => {
    let result = await Applyment.confirm(req.params.id)
    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(200).json(result)
    }
})

router.post('/:id/abandon', auth, async (req, res) => {
    let result = await Applyment.abandon(req.params.id)
    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(200).json(result)
    }
})

router.post('/:id/finish', auth, async (req, res) => {
    let result = await Applyment.finish(req.params.id)
    if (typeof result === 'number') {
        res.status(result).json()
    } else {
        res.status(200).json(result)
    }
})


router.get('/name', auth, async (req, res) => {
    const account = await Account.findOne({
        _id: Object(req.query.candidateID),
    }, { email: 1, personal: 1, _id: 0 })

    res.status(200).json(account)
})



export default router
