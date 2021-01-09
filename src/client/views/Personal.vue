<template lang="pug">
v-card(height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon(color="error") mdi-arrow-left
        v-spacer
        v-btn(icon, @click="save")
            v-icon(color="green") mdi-check

    v-card-text
        PersonalInfo(ref="info")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import PersonalInfo from '@/client/components/PersonalInfo.vue'
import { sendMessage } from '../sysmsg'

@Component({ components: { PersonalInfo } })
export default class extends Vue {
    personalInfo!: any

    async save() {
        const { status } = await axios.patch('/api/account', {
            data: { personal: this.personalInfo.getData() }
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

    async getData() {
        const { status, data } = await axios.get('/api/account', {
            params: { fields: ['personal'] }
        })

        switch (status) {
        case 200:
            this.personalInfo.setData(data.personal)
            break

        case 401:
            sendMessage('尚未登入', { color: 'error' })
            break

        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    mounted() {
        this.personalInfo = this.$refs.info
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
</style>
