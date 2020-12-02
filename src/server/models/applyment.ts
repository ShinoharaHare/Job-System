import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose'

const SApplyment = createSchema({
    applicant: Type.objectId({ require: true}),
    job: Type.objectId({ require: true}),
    resume: Type.string({ require: true}),
    state: Type.number({ default: 0})
})

export type IApplyment = ExtractDoc<typeof SApplyment>
export const Applyment = typedModel('Applyment', SApplyment)
