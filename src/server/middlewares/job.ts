import { Job } from '../models'
import { auth, Middleware } from './'

import { Request, Response } from 'express'

export const findJob: Middleware = async(req, res, next) => {
    try {
        req.job = await Job.findById(req.params.id)
        if (req.job) {
            next()
        } else {
            res.status(404).json({ error: '無此工作' })
        }
    } catch (error) {
        res.status(404).json({ error: '無此工作' })
    }
}

async function chain(req: Request, res: Response, ...middlewares: Middleware[]) {
    for (const m of middlewares) {
        await new Promise((resolve, reject) => {
            const end = res.end
            res.end = (...args: any[]) => {
                reject()
                end(...args)
            }
            m(req, res, resolve)
        })
    }
}

export const checkJobAccess: Middleware = async(req, res, next) => {
    await chain(req, res, auth, findJob)
}
