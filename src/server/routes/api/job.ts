import { auth, findJob, required } from '@/server/middlewares'
import { Account, Job } from '@/server/models'
import { findJobsByTags, getAllTags } from '@/server/tags'

import { Router } from 'express'

import 'ts-mongoose/plugin'


const router = Router()

// 新建工作
router.post('/', auth, required('data'), async (req, res) => {
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


router.get('/favorite', auth, async (req, res) => {
    let jobs = await Account
        .findById(req.account!.id, 'favorite')
        .populateTs('favorite')

    res.status(200).json(jobs!.favorite)
})

// 搜尋工作
router.get('/search', async (req, res) => {
    // test search by tags
    let tagNames: string[] = [];
    if (req.query?.tags) {
        // res.json(req.query?.tags);
        if (Array.isArray(req.query?.tags)) {
            tagNames = req.query?.tags as string[];
        } else if (typeof req.query?.tags === "string") {
            tagNames = [req.query?.tags as string];
        }
    }
    res.json(await findJobsByTags(tagNames)).status(200);
})

router.get('/tags', async (req, res) => {
    let tags = await getAllTags()
    res.status(200).json(tags)
})

// 取得工作詳細資料
router.get('/:id', findJob, async (req, res) => {
    try {
        res.status(200).json(req.job)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

// 更新工作資料
router.put('/:id', auth, findJob, async (req, res) => {
    try {
        const doc = await req.job!.updateOne(req.body.data)
        res.status(200).json(doc)
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

// 刪除工作
router.delete('/:id', auth, findJob, async (req, res) => {
    try {
        await req.job!.remove()
        res.status(204).json()
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
})

// 工作清單
router.get('/', auth, async (req, res) => {
    let jobs: any[] = []

    switch (req.query.type) {
        case 'published':
            jobs = await Job.find({
                publisher: req.account!.id
            })
            break

        case 'all':
        default:
            jobs = await Job.find()
            break
    }

    res.status(200).json(jobs)
})


// 收藏工作
router.post('/:id/favorite', auth, findJob, async (req, res) => {
    try {
        await req.account!.updateOne({ $addToSet: { favorite: req.params.id } })
        res.status(200).json()
    } catch (error) {
        console.error(error)
        res.json(500).json()
    }
})

// 取消收藏工作
router.post('/:id/unfavorite', auth, async (req, res) => {
    try {
        await req.account!.updateOne({
            $pull: { favorite: req.params.id }
        })
        res.status(200).json()
    } catch (error) {
        console.error(error)
        res.json(500).json()
    }
})

export default router
