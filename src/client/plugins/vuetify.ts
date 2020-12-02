import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHant from 'vuetify/src/locale/zh-Hant'

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        locales: { zhHant },
        current: 'zhHant'
    }
})
