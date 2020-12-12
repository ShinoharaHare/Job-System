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

    @Mutation
    setAccount(account: IAccount) {
        this.account = account
    }

    @Action
    async login({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status, data } = await axios.post('/api/account/login', { email, hash })

        return status === 200
    }

    @Action
    async register({ email, password }: IPayload) {
        const hash = sha256(password).toString()
        const { status, data } = await axios.post('/api/account', { email, hash })

        return status === 200
    }
}
