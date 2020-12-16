import { auth, findJob, required } from '@/server/middlewares'
import { Job } from '@/server/models'

import { Router } from 'express'
import { Types } from 'mongoose'

const router = Router()

// 新建工作
router.post('/', auth, required('data'), async(req, res) => {
    try {
        const document = await Job.create({
            ...req.body.data,
            publisher: req.account?.id
        })

        res.status(201).json(document)
    } catch (error) {
        console.error(error)
    }
})

// 取得工作詳細資料
router.get('/:id', findJob, async(req, res) => {
    try {
        res.status(200).json(req.job)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

// 更新工作資料
router.patch('/:id', auth, findJob, async(req, res) => {
    try {
        const doc = await req.job?.update(req.body.data)
        res.status(200).json(doc)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

// 刪除工作
router.delete('/:id', auth, findJob, async(req, res) => {
    try {
        await req.job?.remove()
        res.status(204).json()
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

// 工作清單
router.get('/', async(req, res) => {

})

// 搜尋工作
router.get('/search', findJob, async(req, res) => {

})

// 收藏工作
router.post('/:id/favorite', auth, findJob, async(req, res) => {
    try {
        if (!req.account?.favorite?.includes(req.job?.id)) {
            req.account?.favorite?.push(req.job?.id)
            await req.account?.save()
        }
        res.status(200).json()
    } catch (error) {
        console.error(error)
        res.json(500).json()
    }
})

// 取消收藏工作
router.post('/:id/unfavorite', auth, async(req, res) => {
    try {
        req.account!.favorite = req.account?.favorite?.filter(x => x !== Types.ObjectId(req.params.id))
        await req.account?.save()
        res.status(200).json()
    } catch (error) {
        console.error(error)
        res.json(500).json()
    }
})

export default router
