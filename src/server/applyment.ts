import { Applyment, Job } from './models'
import { sendNots } from '@/server/notification'

import { Types } from 'mongoose'
import 'ts-mongoose/plugin'

export enum State {
    Pending = 0, // 初始狀態，等待刊登者回應
    Accepted, // 刊登者接受
    Rejected, // 刊登者拒絕
    Abandoned, // 申請人放棄
    Confirmed, // 申請人確認,
    Finished // 完成
}

function notify(id: any, title: string, text: string) {
    sendNots([Types.ObjectId(id)], title, text)
}

export async function apply({ applicant, job, resume }: {
    applicant: string,
    job: string,
    resume: string
}) {
    let doc = await Job.findById(job)

    if (!doc)
        return 404

    if (doc.publisher === Types.ObjectId(applicant))
        return 403

    let publisher = doc.publisher as Types.ObjectId


    // sendNots([publisher], `新的應徵者`, `${applyment.job.title}`)

    let applyment = await Applyment.create({
        applicant,
        job,
        resume
    })

    return applyment
}

export async function findByApplicant(applicant: string) {
    let applyments = await Applyment.find({ applicant }).populateTs('job')
    return applyments
}

export async function findByJob(job: string) {
    let applyments = await Applyment.find({ job }).populateTs('job')
    return applyments
}

export async function accept(id: string) {
    let applyment = await Applyment.findById(id).populateTs('job')

    if (!applyment) {
        return 404
    }

    notify(id, '工作申請', `${applyment.job.title}的工作申請已被接受 :)`)

    applyment.state = State.Accepted
    await applyment.save()
}

export async function reject(id: string) {
    let applyment = await Applyment.findById(id).populateTs('job')

    if (!applyment) {
        return 404
    }

    notify(id, '工作申請', `${applyment.job.title}的工作申請已被拒絕 :(`)

    applyment.state = State.Rejected
    await applyment.save()
}

export async function confirm(id: string) {
    let applyment = await Applyment.findById(id)
        .populateTs('job')
        .populateTs('applicant')

    if (!applyment) {
        return 404
    }

    // notify(id, '工作申請', `${applyment.job.title}的工作申請已被拒絕 :(`)

    applyment.state = State.Confirmed
    await applyment.save()
}

export async function abandon(id: string) {
    let applyment = await Applyment.findById(id)
        .populateTs('job')
        .populateTs('applicant')

    if (!applyment) {
        return 404
    }

    applyment.state = State.Abandoned
    await applyment.save()
}
