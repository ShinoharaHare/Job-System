import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose'

const SAccount = createSchema({
    email: Type.string({ require: true, unique: true}),
    password: Type.string({ require: true}),
    ntouStudentID: Type.string({ default: ''}),
    ntouPassword: Type.string({ default: ''}),
    syllabus: Type.array().of(Type.object().of({
        courseName: Type.string(),
        startTime: Type.string(),
        endTime: Type.string()
    })),
    blacklist: Type.array().of(Type.objectId()),
    resumeTemplates: Type.object().of({
        name: Type.string(),
        content: Type.string()
    }),
    notification: Type.object().of({
        name: Type.string(),
        content: Type.string(),
        isRead: Type.boolean()
    }),
    favorite: Type.objectId()
})

export type IAccount = ExtractDoc<typeof SAccount>
export const Account = typedModel('Account', SAccount)
