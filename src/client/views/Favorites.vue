<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 收藏

    JobList(:items="jobs")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JobList from '@/client/components/JobList.vue'

@Component({ components: { JobList } })
export default class extends Vue {
    jobs: any[] = []

    mounted () {
        for (let i = 0; i < 10; i++) {
            this.jobs.push({
                title: '抓雞雞',
                location: '海洋大學店',
                tags: ['短期', '假日']
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
