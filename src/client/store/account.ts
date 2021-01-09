import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import sha256 from 'crypto-js/sha256'

import { IAccount } from '@/server/models/account'

interface IPayload {
    email: string;
    password: string;
}

@Module({ namespaced: true })
export default class extends VuexModule {
    account: IAccount | null = null
    isLogin = false
    isJobSeeker = true

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

    @Action
    async register({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status } = await axios.post('/api/account', { email, hash })
        return status
    }

    @Action
    async login({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status, data } = await axios.post('/api/account/login', { email, hash })

        this.context.dispatch('getAccountInfo')

        return status
    }

    @Action
    async logout() {
        const { status } = await axios.post('/api/account/logout')
        return status
    }

    @Action
    async switchUserState() {
        this.context.commit('setIsJobSeeker', !this.isJobSeeker)
        return this.isJobSeeker
    }

    @Action
    async getAccountInfo() {
        const { status, data } = await axios.get('/api/account')
        if (status === 200) {
            this.context.commit('setAccount', data)
            this.context.commit('setIsLogin', true)
        }
    }

    @Action
    async favorite(job: any) {
        let { status } = await axios.post(`/api/job/${job}/favorite`)
        if (status === 200) {
            let temp = this.account
            temp!.favorite!.push(job)
            this.context.commit('setAccount', temp)
        }
    }

    @Action
    async unfavorite(job: any) {
        let { status } = await axios.post(`/api/job/${job}/unfavorite`)
        if (status === 200) {
            let temp = this.account
            temp!.favorite! = temp!.favorite!.filter(x => x != job)
            this.context.commit('setAccount', temp)
        }
    }
}
