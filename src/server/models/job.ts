import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose'

const SJob = createSchema({
    title: Type.string({ require: true}),
    content: Type.string({ default: ''}),
    vacanies: Type.number({ require: true}),
    time: Type.array({ require: true}).of(Type.object().of({
        startTime: Type.string(),
        endTime: Type.string()
    })),
    tags: Type.string({ require: true}),
    publisher: Type.string({ require: true})
})

export type IJob = ExtractDoc<typeof SJob>
export const Job = typedModel('Job', SJob)
