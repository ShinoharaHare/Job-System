<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 應徵管理

    v-expansion-panels.mt-2(tile, accordion, multiple)
        v-expansion-panel(v-for="({ name }, i) in jobs", :key="i")
            v-expansion-panel-header {{ name }}
            v-expansion-panel-content
                v-card-actions
                    v-spacer
                    v-btn(color="error") 撤銷
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    jobs: any[] = []

    mounted () {
        for (let i = 0; i < 5; i++) {
            this.jobs.push({
                name: '抓雞雞'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.v-btn--absolute.v-btn--bottom, .v-btn--fixed.v-btn--bottom {
    bottom: 16px !important;
}
</style>
