import * as superagent from 'superagent'
import * as cheerio from 'cheerio'

import api from './api'
import Course from './course'
import Personal from './personal'
import { extractHiddens, parseMessage } from './utils'

class Account {
    private agent: superagent.SuperAgentStatic
    private id: string
    private pw: string

    public course: Course
    public personal: Personal

    constructor(id: string, pw: string) {
        this.agent = superagent.agent()
        this.course = new Course(this)
        this.personal = new Personal(this)
        this.id = id
        this.pw = pw
    }

    async get(url: string, query?: any) {
        return await this.agent.get(url).query(query ?? {})
    }

    async post(url: string, data?: any) {
        return this.agent.post(url).type('form').send(data)
    }

    async postAsp(url: string, data?: any) {
        const $ = await this.get$(url)
        const payload = extractHiddens($.html())
        Object.assign(payload, data)
        return this.agent.post(url).type('form').send(payload)
    }

    async get$(url: string, query?: any) {
        const { text } = await this.get(url, query)
        return cheerio.load(text)
    }

    async post$(url: string, payload?: any) {
        const { text } = await this.post(url, payload)
        return cheerio.load(text)
    }

    async postAsp$(url: string, payload?: any) {
        const { text } = await this.postAsp(url, payload)
        return cheerio.load(text)
    }

    async isTimeout() {
        const { text } = await this.get(api.TITLE)
        const { alert } = parseMessage(text)
        return alert === '使用時間逾時, 系統已將您自動登出, 請再重新登入使用本系統!!'
    }

    async login() {
        await this.get(api.DEFAULTQ)
        const { header } = await this.postAsp(api.DEFAULT, {
            M_PORTAL_LOGIN_ACNT: this.id,
            M_PW: this.pw,
            LGOIN_BTN: '登入/Login'
        })
        if (header['set-cookie']) {
            await this.get(api.MENU_TREE)
        } else {
            throw new Error('登入失敗')
        }
    }
}

export default Account
