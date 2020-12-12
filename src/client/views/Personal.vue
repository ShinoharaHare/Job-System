<template lang="pug">
v-card(height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left
        v-spacer
        v-btn(icon, @click="save")
            v-icon mdi-check

    v-card-text
        PersonalInfo(ref="info")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import PersonalInfo from '@/client/components/PersonalInfo.vue'

@Component({ components: { PersonalInfo } })
export default class extends Vue {
    personalInfo!: any

    async save() {
        const { status } = await axios.patch('/api/account', {
            data: { personal: this.personalInfo.getData() }
        })

        if (status === 200) {

        } else {

        }
    }

    async getData() {
        const { status, data } = await axios.get('/api/account', {
            params: { fields: ['personal'] }
        })
        if (status === 200) {
            this.personalInfo.setData(data.personal)
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
