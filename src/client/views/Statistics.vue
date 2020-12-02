<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 統計

    v-list
        v-subheader 應徵過的工作
        v-divider
        JobList(:items="applied", height="200")

    v-divider

    v-list
        v-subheader 成功完成的工作
        v-divider
        JobList(:items="succeed", height="200")

    v-sparkline(
        :value="value",
        :gradient="gradient",
        :smooth="radius || false",
        :padding="padding",
        :line-width="width",
        :stroke-linecap="lineCap",
        :gradient-direction="gradientDirection",
        :fill="fill",
        :type="type",
        :auto-line-width="autoLineWidth",
        auto-draw
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JobList from '@/client/components/JobList.vue'

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea']
]

@Component({ components: { JobList } })
export default class extends Vue {
    width = 2
    radius = 10
    padding = 8
    lineCap = 'round'
    gradient = gradients[5]
    value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
    gradientDirection = 'top'
    gradients = gradients
    fill = false
    type = 'trend'
    autoLineWidth = false

    applied: any[] = []
    succeed: any[] = []

    mounted () {
        for (let i = 0; i < 5; i++) {
            this.applied.push({
                title: '抓雞雞',
                location: '海洋大學店',
                tags: ['短期', '假日']
            })
        }

        for (let i = 0; i < 5; i++) {
            this.succeed.push({
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
