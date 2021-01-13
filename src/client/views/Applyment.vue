<template lang="pug">
v-card(tile)
    v-toolbar(dark)
        v-toolbar-title 
</template>


<script lang="ts">
import { IApplyment } from '@/server/models'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

import PersonalInfo from '@/client/components/PersonalInfo.vue'


@Component({ components: { PersonalInfo } })
export default class extends Vue {
    @Ref() personal!: PersonalInfo

    applyment: IApplyment | null = null

    get id() {
        return this.$route.params.id
    }

    async loadData() {
        let { status, data } = await axios.get(`/api/applyment/${this.id}`)
        if (status === 200) {
            this.applyment = data
        }
    }
}
</script>