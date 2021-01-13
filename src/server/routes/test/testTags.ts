import { Router } from 'express'
import { Types } from 'mongoose'
import { findJobsByTag, findJobsByTags, getAllTags, createTag, newJobUpdateTags } from '@/server/tags'
import { stringify } from 'querystring';
import { Job } from '@/server/models';

const router = Router()

router.get('/', async(req, res) => {
    console.log(req.query.title)
    let result = await Job.find({
        title: {
            $regex: `${req.query.title}`, $options: "$i"
        }}, "id")
    res.json(result)
    return ;
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

router.get('/newJobUpdateTags', async(req, res) => {
    await newJobUpdateTags(["長期", "87"], Types.ObjectId("5fda4ad8251b020e2a3381df"))
    res.json({})
});


export default router