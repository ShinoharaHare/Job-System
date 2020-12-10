import Vue from 'vue'
import Vuex from 'vuex'

import Account from './account'
import Notification from './notification'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Account,
        Notification
    }
})

export default store
