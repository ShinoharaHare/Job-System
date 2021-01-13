import { Applyment, DApplyment, Job } from './models'
import { sendNots } from '@/server/notification'
import { ApplymentState as State } from '@/server/enums'

import { Types } from 'mongoose'
import 'ts-mongoose/plugin'

function notify(id: any, title: string, text: string) {
    sendNots([Types.ObjectId(id)], title, text)
}

export default class ApplymentHelper {
    private document!: DApplyment

    async accept() {
        await this.document.updateOne({
            state: State.Accepted
        })
    }

    async reject() {
        await this.document.updateOne({
            state: State.Rejected
        })
    }

    async confirm() {
        await this.document.updateOne({
            state: State.Confirmed
        })
    }

    async abandon() {
        await this.document.updateOne({
            state: State.Abandoned
        })
    }

    async finish() {
        await this.document.updateOne({
            state: State.Finished
        })
    }

    static async apply({ applicant, job, resume }: {
        applicant: string,
        job: string,
        resume: string
    }) {

    }

    static async load(id: string) {
        let doc = await Applyment.findById(id)
        if (!doc) {
            return null
        }

        let obj = new ApplymentHelper
        obj.document = doc

        return obj
    }

    static async find() {

    }
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
    let applyments = await Applyment
        .find({ applicant })
        .populateTs('job')
        .populateTs('applicant')

    return applyments
}

export async function findByJob(job: string) {
    let applyments = await Applyment
        .find({ job })
        .populateTs('job')
        .populateTs('applicant')

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

export async function finish(id: string) {
    let applyment = await Applyment.findById(id)
        .populateTs('job')
        .populateTs('applicant')

    if (!applyment) {
        return 404
    }

    applyment.state = State.Finished
    await applyment.save()
}

export async function deleteByJob(job: string) {
    await Applyment.deleteMany({ job })
}