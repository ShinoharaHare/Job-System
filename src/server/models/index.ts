import config from '@/server/config'

import { set, connect } from 'mongoose'
import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose'

set('useCreateIndex', true)
connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

export * from './account'
export * from './applyment'
export * from './job'
export * from './tag'
