import { Router } from 'express'
import { Types } from 'mongoose'
import { findJobsByTag, findJobsByTags, getAllTags, createTag } from '@/server/tags'
import { stringify } from 'querystring';

const router = Router()

router.get('/', async(req, res) => {
    // console.log(await findJobs("好工作"));
    const jobs = await findJobsByTag("好工作");
    res.json(jobs);
});

router.get('/findJobsByTags', async(req, res) => {
    // console.log(await findJobs("好工作"));
    const jobs = await findJobsByTags(["長期"]);
    res.json(jobs);
});

router.get('/getAllTags', async(req, res) => {
    // console.log(await findJobs("好工作"));
    const jobs = await getAllTags();
    res.json(jobs);
});

router.get('/createTag', async(req, res) => {
    let tagName = "test";
    if(req.query.name){
        tagName = req.query.name as string;
    }
    res.json(await createTag(tagName));
});

export default router