import { auth, findJob, required } from '@/server/middlewares'
import { Account, Job } from '@/server/models'
import * as tags from '@/server/tags'

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
        tags.newJobUpdateTags(req.body.data.tags, document.id)
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
    // search by title
    let titleToSearch: string | undefined = undefined
    if (req.query?.title) {
        if (Array.isArray(req.query?.title)) {
            titleToSearch = req.query?.title[0] as string;
        } else if (typeof req.query?.title === "string") {
            titleToSearch = req.query?.title as string;
        } else {
            // title error
            titleToSearch = undefined
        }
    }
    // search by tags
    let tagNames: string[] | undefined = undefined
    if (req.query?.tags) {
        // res.json(req.query?.tags);
        if (Array.isArray(req.query?.tags)) {
            tagNames = req.query?.tags as string[];
        } else if (typeof req.query?.tags === "string") {
            tagNames = [req.query?.tags as string];
        } else {
            // tags error
            tagNames = undefined
        }
    }

    // all
    let intersection: any[] = []
    if (titleToSearch && tagNames) {
        let jobsWithTags = await tags.findJobsByTags(tagNames)
        let result = await Job.find({
            _id: {
                $in: jobsWithTags
            },
            title: {
                $regex: `${titleToSearch}`, $options: "$i"
            },
            finish: false
        })
        intersection = result//.map((x)=>x._id)
        let result2 = await Job.find({
            _id: {
                $in: jobsWithTags
            },
            finish: false
        })
        intersection = intersection.concat(result2.filter((x) => !result.includes(x)))
    } else if (titleToSearch) {
        let result = await Job.find({
            title: {
                $regex: `${titleToSearch}`, $options: "$i"
            },
            finish: false
        })
        intersection = result//.map((x)=>x._id)
    } else if (tagNames) {
        let jobsWithTags = await tags.findJobsByTags(tagNames)
        let result = await Job.find({
            _id: {
                $in: jobsWithTags
            },
            finish: false
        })
        console.log("jobsWithTags: ", jobsWithTags)
        intersection = result//.map((x)=>x._id)
    }

    res.status(200).json(intersection);
})

router.get('/tags', async (req, res) => {
    let allTags = await tags.getAllTags()
    res.status(200).json(allTags)
})

// 工作清單
router.get('/all', async (req, res) => {
    let jobs = await Job.find({
        finish: false
    })
    res.status(200).json(jobs)
})

router.get('/published', auth, async (req, res) => {
    let jobs = await Job.find({ publisher: req.account!.id })
    res.status(200).json(jobs)
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
router.put('/:id', auth, findJob, required('data'), async (req, res) => {
    try {
        const doc = await req.job!.updateOne(req.body.data)
        await tags.newJobUpdateTags(req.body.data.tags, req.job?.id)
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

router.get('/:id/finish', auth, findJob, async (req, res) => {
    try {
        await req.job!.updateOne({
            finish: true
        })
        res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }

})

export default router
