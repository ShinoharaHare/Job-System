import config from '@/server/config'

import { set, connect } from 'mongoose'
import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose'

set('useCreateIndex', true)
connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const SJob = createSchema({
    name: Type.string(),
    salary: Type.number()
})
export type IJob = ExtractDoc<typeof SJob>
export const Job = typedModel('Job', SJob)

const SUser = createSchema({
    name: Type.string(),
    gender: Type.string()
})
export type IUser = ExtractDoc<typeof SUser>
export const User = typedModel('User', SUser)
