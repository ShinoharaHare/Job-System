<template lang="pug">
v-card(height="100%")
    v-toolbar
        v-btn(icon, @click="$router.back()")
            v-icon(color="error") mdi-arrow-left
        v-spacer
        v-btn(icon, @click="save")
            v-icon(color="green") mdi-check

    v-card-text
        PersonalInfo(ref="info")
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '../sysmsg'

import PersonalInfo from '@/client/components/PersonalInfo.vue'


@Component({ components: { PersonalInfo } })
export default class extends Vue {
    @Ref() info!: PersonalInfo

    async save() {
        const { status } = await axios.patch('/api/account', {
            data: { personal: this.info.getData() }
        })

        switch (status) {
        case 200:
            sendMessage('更新成功')
            break

        case 401:
            sendMessage('尚未登入', { color: 'error' })
            break

        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async loadData() {
        const { status, data } = await axios.get('/api/account', {
            params: { fields: ['personal'] }
        })

        switch (status) {
        case 200:
            this.info.setData(data.personal)
            break

        case 401:
            sendMessage('尚未登入', { color: 'error' })
            break

        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    mounted() {
        this.loadData()
    }
}
</script>

<style lang="scss" scoped>
</style>
