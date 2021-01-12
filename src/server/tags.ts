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

export const newJobUpdateTags = async(tags: string[], jobID: Types.ObjectId) => {
    tags.forEach(async(tagName) => {
        let result = await Tag.findOne({name: tagName})
        if(result){  // 標籤存在
            if(!result.jobs?.includes(jobID)){  // 標籤裡面沒有該工作
                result.jobs?.push(jobID)  // 加入工作
                result.save()
            }
            // 重複的工作
        }else{  // 標籤不存在
            await createTag(tagName, jobID)  // 建立新標籤
        }
        // console.log(result)
    })
}