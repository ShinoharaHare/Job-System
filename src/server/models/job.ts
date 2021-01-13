import { SAccount } from './account'

import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose'

const Time = createSchema({
    weekday: Type.number({ required: true }),
    start: Type.string({ required: true }),
    end: Type.string({ required: true })
},
{
    _id: false
})

export const SJob = createSchema({
    title: Type.string({ required: true }),
    content: Type.string({ default: '' }),
    // vacanies: Type.number({ required: true }),
    time: Type.array({ required: true }).of(Time),
    tags: Type.array({ required: true }).of(Type.string()),
    publisher: Type.objectId({ required: true })
})

SJob.add({
    publisher: Type.ref(Type.objectId({ required: true })).to('Account', SAccount)
})

export type DJob = ExtractDoc<typeof SJob>
export type IJob = ExtractProps<typeof SJob>
export const Job = typedModel('Job', SJob)
