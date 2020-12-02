import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose'
import { SJob } from './job'

const Syllabus = createSchema({
    courseName: Type.string({ required: true }),
    startTime: Type.string({ required: true }),
    endTime: Type.string({ required: true })
})

const ResumeTemplate = createSchema({
    name: Type.string({ required: true }),
    content: Type.string({ required: true })
})

const Notification = createSchema({
    name: Type.string({ required: true }),
    content: Type.string({ required: true }),
    isRead: Type.boolean({ default: false })
})

export const SAccount = createSchema({
    email: Type.string({ required: true, unique: true }),
    hash: Type.string({ required: true }),
    ntouStudentID: Type.string({ default: '' }),
    ntouPassword: Type.string({ default: '' }),
    syllabus: Type.array().of(Syllabus),
    blacklist: Type.array({ default: [] }).of(Type.objectId()),
    resumeTemplates: Type.array({ default: [] }).of(ResumeTemplate),
    notification: Type.array({ default: [] }).of(Notification),
    favorite: Type.array({ default: [] }).of(Type.ref(Type.objectId()).to('Job', SJob))
})

SAccount.add({
    blacklist: Type.array({ default: [] }).of(Type.ref(Type.objectId()).to('Account', SAccount))
})

export type DAccount = ExtractDoc<typeof SAccount>
export type IAccount = ExtractProps<typeof SAccount>
export const Account = typedModel('Account', SAccount)
