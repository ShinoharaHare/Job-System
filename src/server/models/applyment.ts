import { SJob } from './job'
import { SAccount } from './account'

import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose'

const SApplyment = createSchema({
    applicant: Type.ref(Type.objectId({ required: true })).to('Account', SAccount),
    job: Type.ref(Type.objectId({ required: true })).to('Job', SJob),
    resume: Type.string({ required: true }),
    state: Type.number({ default: 0 })
})

export type DApplyment = ExtractDoc<typeof SApplyment>
export type IApplyment = ExtractProps<typeof SApplyment>
export const Applyment = typedModel('Applyment', SApplyment)
