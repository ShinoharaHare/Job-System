import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class extends VuexModule {
    timeout = 3000
    show = false
    message = ''
}
