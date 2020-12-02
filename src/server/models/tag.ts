import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose'

const STag = createSchema({
    name: Type.string({ require: true, unique: true}),
    jobs: Type.array().of(Type.objectId())
})

export type ITag = ExtractDoc<typeof STag>
export const Tag = typedModel('Tag', STag)
