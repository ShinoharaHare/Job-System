import { DApplyment, Applyment, Job, Account } from './models';

import { Types } from 'mongoose'

import { sendNots } from '@/server/notification'
import account from '@/client/store/account';

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

export const bossConfirm = async(applyment: Types.ObjectId, boss: Types.ObjectId) => {
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

export const applicantConfirm = async(applyment: Types.ObjectId, applicant: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    if (String(targetApplyment?.applicant) == String(applicant)) {
        console.log('確認為同一人')
    }
    else {
        console.log('無權限')
        return 403
    }
}

export const createApplyment = async(applicant: Types.ObjectId, job: Types.ObjectId, resume: string) => {
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

export const findDataApplyment = async(applyment: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetJob) {
        console.log('查詢成功')
        return targetJob.content
    }
    else {
        console.log('查詢失敗')
        return 400
    }
}

export const bossAcceptApplyment = async(applyment: Types.ObjectId) => {
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
export const bossRefuseApplyment = async(applyment: Types.ObjectId) => {
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
export const applicantAcceptApplyment = async(applyment: Types.ObjectId) => {
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
export const applicantGiveupApplyment = async(applyment: Types.ObjectId) => {
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

export const applicantRefuseApplyment = async(applyment: Types.ObjectId) => {
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