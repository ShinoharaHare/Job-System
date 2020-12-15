<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title
            h3 已應徵之工作

    v-expansion-panels.mt-5(tile, popout, multiple, hover)
        v-expansion-panel(v-for="({ title, publisher, content, vacancies, time, tags }, i) in jobs", :key="i")
            v-expansion-panel-header
                v-panel-title
                    h3 {{ title }}
                v-panel-description {{ publisher }}
            v-expansion-panel-content
                v-divider
                v-card-actions
                    v-list(two-line, width="100%")
                        v-list-item
                            v-list-item-content
                                v-list-item-title 工作內容
                                v-list-item-subtitle {{ content }}

                        v-list-item
                            v-list-item-content
                                v-list-item-title 工作人數
                                v-list-item-subtitle {{ vacancies }}人

                        v-list-item
                            v-list-item-content
                                v-list-item-title 工作時間
                                v-list-item-subtitle {{ time }}

                        v-list-item
                            v-list-item-content
                                v-list-item-title 工作標籤
                                v-list-item-subtitle {{ tags }}

                        v-divider.pa-1
                        v-list-item
                            v-spacer
                            v-list-item-icon
                                v-btn(color="primary") 確認
                                v-btn(color="error") 撤銷
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    jobs: any[] = []

    mounted() {
        for (let i = 0; i < 5; i++) {
            this.jobs.push({
                title: '工讀生',
                publisher: 'WJ股份有限公司',
                content: '賣屁股',
                vacancies: '6',
                time: '17:10 ~ 23:10',
                tags: '#屁#股'
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
