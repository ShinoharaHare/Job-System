<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 收藏

    JobList(:items="jobs")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IJob, IAccount } from '@/server/models'

import JobList from '@/client/components/JobList.vue'

const Account = namespace('Account')


@Component({ components: { JobList } })
export default class extends Vue {
    jobs: IJob[] = []

    async loadData() {
        let { status, data } = await axios.get('/api/job/favorite')
        if (status == 200) {
            this.jobs = data
        }
    }

    mounted() {
        this.loadData()
    }
}
</script>

<style lang="scss" scoped>
</style>
