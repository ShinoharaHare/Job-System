import { SJob } from './job'

import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose'

export const STag = createSchema({
    name: Type.string({ required: true, unique: true }),
    jobs: Type.array().of(Type.ref(Type.objectId()).to('Job', SJob))
})

export type DTag = ExtractDoc<typeof STag>
export type ITag = ExtractProps<typeof STag>
export const Tag = typedModel('Tag', STag)
