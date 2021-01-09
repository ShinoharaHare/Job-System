import { DApplyment, Applyment, Job } from './models';

import { Types } from 'mongoose'

import { sendNots } from '@/server/notification'

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

export const createApplyment = async(applicant: Types.ObjectId, job: Types.ObjectId, resume: string) => {
    await Applyment.create({
        applicant: applicant,
        job: job,
        resume: resume
    });
    console.log('Applyment成功創建')
}

export const findDataApplyment = async(applicant: Types.ObjectId) => {
    const target = await Applyment.findById(applicant)
    const data = await Job.findById(target?.job)
    if (data) {
        return data.content
    }
}

export const bossAcceptApplyment = async(applicant: Types.ObjectId) => {
    const applicantarray: Types.ObjectId[] = [applicant]
    const targetApplyment = await Applyment.findOne({ applicant: applicant })
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetApplyment) {
        if (targetJob) {
            bossAccept(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已成功被接受 :)')
            console.log('老闆成功接受')
            return 200
        } else {
            console.log('Job Not Exist')
            return 401
        }
    } else {
        console.log('Applyment Not Exist')
        return 402
    }
}
export const bossRefuseApplyment = async(applicant: Types.ObjectId) => {
    const applicantarray: Types.ObjectId[] = [applicant]
    const targetApplyment = await Applyment.findOne({ applicant: applicant })
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetApplyment) {
        if (targetJob) {
            bossRefuse(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已被拒絕 :(')
            console.log('老闆成功拒絕')
            return 200
        } else {
            console.log('Job Not Exist')
            return 401
        }
    } else {
        console.log('Applyment Not Exist')
        return 402
    }
}
export const applicantAcceptApplyment = async(applicant: Types.ObjectId) => {
    const applicantarray: Types.ObjectId[] = [applicant]
    const targetApplyment = await Applyment.findOne({ applicant: applicant })
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetApplyment) {
        if (targetJob) {
            applicantAccept(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已成功接受 :(')
            console.log('申請人成功接受')
            return 200
        } else {
            console.log('Job Not Exist')
            return 401
        }
    } else {
        console.log('Applyment Not Exist')
        return 402
    }
}
export const applicantGiveupApplyment = async(applicant: Types.ObjectId) => {
    const applicantarray: Types.ObjectId[] = [applicant]
    const targetApplyment = await Applyment.findOne({ applicant: applicant })
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetApplyment) {
        if (targetJob) {
            applicantGiveup(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已放棄 :(')
            console.log('申請人成功放棄')
            return 200
        } else {
            console.log('Job Not Exist')
            return 401
        }
    } else {
        console.log('Applyment Not Exist')
        return 402
    }
}

export const applicantRefuseApplyment = async(applicant: Types.ObjectId) => {
    const applicantarray: Types.ObjectId[] = [applicant]
    const targetApplyment = await Applyment.findOne({ applicant: applicant })
    const targetJob = await Job.findById(targetApplyment?.job)
    if (targetApplyment) {
        if (targetJob) {
            applicantRefuse(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已成功拒絕 :(')
            console.log('申請人成功拒絕')
            return 200
        } else {
            console.log('Job Not Exist')
            return 401
        }
    } else {
        console.log('Applyment Not Exist')
        return 402
    }
}
