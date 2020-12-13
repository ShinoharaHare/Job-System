import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import sha256 from 'crypto-js/sha256'

import { IAccount } from '@/server/models/account'
import { IJob } from '@/server/models/job'

interface IPayload {
    email: string;
    password: string;
}

@Module({ namespaced: true })
export default class extends VuexModule {
    account: IAccount | null = null
    isLogin = false
    isJobSeeker = true
    comments = ''
    searchResults: IJob[] | null = null

    @Mutation
    setAccount(account: IAccount) {
        this.account = account
    }

    @Mutation
    setIsLogin(isLogin: boolean) {
        this.isLogin = isLogin
    }

    @Mutation
    setIsJobSeeker(isJobSeeker: boolean) {
        this.isJobSeeker = isJobSeeker
    }

    @Mutation
    setComment(content: string) {
        this.comments = content
    }

    @Mutation
    setSearchResults(searchResults: IJob[]) {
        this.searchResults = new Array<IJob>()
        for (let i = 0; i < searchResults.length; i++) {
            this.searchResults[i] = searchResults[i]
        }
    }

    @Action
    async login({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status, data } = await axios.post('/api/account/login', { email, hash })
        this.context.commit('setAccount', data) // account資料疑會在畫面重整後消失不見
        if (this.account != null) {
            this.context.commit('setIsLogin', true)
        }
        this.context.commit('setIsJobSeeker', true)
        return status === 200
    }

    @Action
    async register({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status, data } = await axios.post('/api/account', { email, hash })

        return status === 201
    }

    @Action
    async findPWD(email: string) {
        const { status, data } = await axios.post('/api/account/findPWD', email)

        return status === 200
    }

    @Action
    async switchUserState() {
        this.context.commit('setIsJobSeeker', !this.isJobSeeker)
    }

    @Action
    async comment(content: string) {
        const { status, data } = await axios.post('api/account/comment', content)

        return status
    }

    @Action
    async search(keyword: string) {
        const { status, data } = await axios.post('api/account/search', keyword)
        this.context.commit('setSearchResults', data)

        return status === 200
    }

    @Action
    async addFavorite({ title, content, vacanies, time, tags, publisher }: IJob) {
        const { status, data } = await axios.post('api/account/addFavorite', { title, content, vacanies, time, tags, publisher })

        return status
    }

    @Action
    async deleteFavorite({ title, content, vacanies, time, tags, publisher }: IJob) {
        const { status, data } = await axios.post('api/account/deleteFavorite', { title, content, vacanies, time, tags, publisher })

        return status
    }

    @Action
    async block(account: IAccount) {
        const { status, data } = await axios.post('api/account/block', account)
    }

    @Action
    async unblock(account: IAccount) {
        const { status, data } = await axios.post('api/account/unblock', account)
    }

    @Action
    async addResume(name: string, content: string) {
        const { status, data } = await axios.post('api/account/addResume', { name, content })
    }

    @Action
    async deleteResume(name: string, content: string) {
        const { status, data } = await axios.post('api/account/addResume', { name, content })
    }

    @Action
    async updateResume(content: string) {
        const { status, data } = await axios.post('api/account/addResume', { name, content })
    }

    @Action
    async stat() {

    }
}
