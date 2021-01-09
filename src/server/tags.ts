import { Types } from 'mongoose'
import { Tag } from '@/server/models'
import { stringify } from 'querystring';

export const getAllTags = async() => {
    return (await Tag.find({}, "name"));
}

export const findJobsByTag = async(tagName: string) => {
    let jobs = await Tag.findOne({
        name: tagName
    }, "jobs");
    return jobs? jobs.jobs : [];
}

export const findJobsByTags = async(tagNames: string[]) => {
    let intersection: any[] = [];
    let first: boolean = true;
    for(let tagName of tagNames){
        let jobs = await Tag.findOne({
            name: tagName
        }, "jobs");
        if(jobs){
            if(first){
                // intersection
                console.log("intersection = ", jobs.jobs!);
                intersection = jobs.jobs!
                first = false;
            }else{
                console.log("origin: ", intersection);
                intersection = intersection.filter((x) => jobs!.jobs!.includes(x));
            }
        }
    }
    return intersection;
}

export const createTag = async(name: string, jobID?: Types.ObjectId) => {
    return await Tag.create({
        name: name,
        jobs: jobID? [jobID] : []
    });
}