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
    async login({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status, data } = await axios.post('/api/account/login', { email, hash })

        this.context.commit('setIsLogin', status === 200)

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
}
