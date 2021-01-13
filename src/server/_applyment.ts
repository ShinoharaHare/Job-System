import { DApplyment, Applyment, Job, Account } from './models';

import { Types } from 'mongoose'

import { sendNots } from '@/server/notification'


export const enum State {
    Pending = 0, // 初始狀態，等待刊登者回應
    Accepted, // 刊登者接受
    Rejected, // 刊登者拒絕
    Abandoned, // 申請人放棄
    Confirmed, // 申請人確認,
    Finished // 完成
}

const bossAccept = (applyment: DApplyment) => {
    applyment.state = 1
    applyment.save()
}

const applicantAccept = (applyment: DApplyment) => {
    applyment.state = 2
    applyment.save()
}

const applicantRefuse = (applyment: DApplyment) => {
    applyment.state = 3
    applyment.save()
}

const bossRefuse = (applyment: DApplyment) => {
    applyment.state = 4
    applyment.save()
}

const applicantGiveup = (applyment: DApplyment) => {
    applyment.state = 5
    applyment.save()
}

export const bossConfirm = async (applyment: Types.ObjectId, boss: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    if (String(targetJob?.publisher) == String(boss)) {
        console.log('確認為同一人')
    }
    else {
        console.log('無權限')
        return 403
    }
}

export const applicantConfirm = async (applyment: Types.ObjectId, applicant: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    if (String(targetApplyment?.applicant) == String(applicant)) {
        console.log('確認為同一人')
    }
    else {
        console.log('無權限')
        return 403
    }
}

export const createApplyment = async (applicant: Types.ObjectId, job: Types.ObjectId, resume: string) => {
    const targetJob = await Job.findById(job)
    if (targetJob) {
        if (applicant == targetJob?.publisher) {
            console.log('自己應徵自己')
            return 403
        }
        else {
            await Applyment.create({
                applicant: applicant,
                job: job,
                resume: resume
            });
            console.log('Applyment成功創建')
            return 201
        }
    }
    else {
        console.log('查無此工作')
        return 404
    }
}

export async function abandon(applyment: string) {
    let doc = await Applyment.findOneById(applyment)
    if (!doc) {
        return 404
    } 

    doc.state = 3
}

export async function find(job?: string, applicant?: string) {
    let query: any = {
        job,
        applicant
    }

    for (let [key, val] of Object.entries(query)) {
        if (val === undefined) {
            delete query[key]
        }
    }

    let docs = await Applyment.find(query)
    return docs
}


export const bossAcceptApplyment = async (applyment: string) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
        bossAccept(targetApplyment)
        sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已被接受 :)')
        console.log('老闆成功接受')
        return 200
    }
    else {
        console.log('無此應徵')
        return 404
    }
}
export const bossRefuseApplyment = async (applyment: string) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
        bossRefuse(targetApplyment)
        sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已被拒絕 :(')
        console.log('老闆成功拒絕')
        return 200
    }
    else {
        console.log('無此應徵')
        return 404
    }
}
export const applicantAcceptApplyment = async (applyment: string) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
        applicantAccept(targetApplyment)
        sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已接受 :)')
        console.log('申請人成功接受')
        return 200
    }
    else {
        console.log('無此應徵')
        return 404
    }
}
export const applicantGiveupApplyment = async (applyment: string) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
        applicantGiveup(targetApplyment)
        sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已放棄 :(')
        console.log('申請人成功放棄')
        return 200
    }
    else {
        console.log('無此應徵')
        return 404
    }
}

export const applicantRefuseApplyment = async (applyment: string) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
        applicantRefuse(targetApplyment)
        sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已拒絕 :(')
        console.log('申請人成功拒絕')
        return 200
    }
    else {
        console.log('無此應徵')
        return 404
    }
}

// findDataApplyment(Types.ObjectId('5fde0206359f4c512ce389be'))
// applicantConfirm(Types.ObjectId('5fde0206359f4c512ce389be'), Types.ObjectId('5fd258253ec604545ce35e46'))