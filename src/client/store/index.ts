import Vue from 'vue'
import Vuex from 'vuex'

import Account from './account'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Account
    }
})

export default store
