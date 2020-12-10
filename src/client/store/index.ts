import Vue from 'vue'
import Vuex from 'vuex'

import Account from './account'
import Sysmsg from './sysmsg'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Account,
        Sysmsg
    }
})

export default store
