<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title
            h3.ma-5 已應徵之工作

    v-expansion-panels.mt-5(tile, popout, multiple, hover)
        v-expansion-panel(v-for="({ title, publisher, content, vacancies, time, tags, state }, index) in jobs", :key="index")
            v-expansion-panel-header
                v-panel-title
                    h3 {{ title }}
                v-panel-description {{ publisher }}
                span(align="right")
                    v-chip(color="normal", v-if="state == 0") 尚未回應
                    v-chip(color="primary", v-else-if="state == 1") 雇主已接受
                    v-chip(color="success", v-else-if="state == 2") 已確認
                    v-chip(color="error", v-else-if="state == 3 || state == 5") 已放棄
                    v-chip(color="error", v-else-if="state == 4") 雇主已拒絕
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
                            span
                                v-btn(class="ma-2", color="primary", @click="confirmApplyment(index)", v-if="state == 1") 確認
                                v-btn(color="error", @click="abandonApplyment(index)", v-if="state == 0 || state == 1") 放棄
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { sendMessage } from '@/client/sysmsg'

@Component
export default class extends Vue {
    jobs: any[] = []
    active = false

    mounted() {
        for (let i = 0; i < 6; i++) {
            this.jobs.push({
                title: '工讀生',
                publisher: 'WJ股份有限公司',
                content: '賣屁股',
                vacancies: '6',
                time: '17:10 ~ 23:10',
                tags: '#屁#股',
                state: i /*
                            0: (雇主尚未回應)
                            1: (雇主接受，求職者尚未回應)
                            2: (雇主接受，求職者接受)
                            3: (雇主接受，求職者拒絕)
                            4: (雇主拒絕)
                            5: (求職者放棄)
                            */
            })
        }
    }

    async confirmApplyment(index: number) {
        this.jobs[index].state = 2

        /* const status = await this.
        switch (status) {
            case 200:
                sendMessage('確認成功')
                break

            case 401:
                sendMessage('未登入', { color: 'error' })
                break

            case 403:
                sendMessage('無權限', { color: 'error' })
                break

            case 404:
                sendMessage('無此應徵', { color: 'error' })
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
                break
        } */
        sendMessage('確認成功')
    }

    async abandonApplyment(index: number) {
        if (this.jobs[index].state === 0) { this.jobs[index].state = 5 } else if (this.jobs[index].state === 1) { this.jobs[index].state = 3 }

        /* const status = await
        switch (status) {
            case 200:
                sendMessage('放棄成功')
                break

            case 401:
                sendMessage('未登入', { color: 'error' })
                break

            case 403:
                sendMessage('無權限', { color: 'error' })
                break

            case 404:
                sendMessage('無此應徵', { color: 'error' })
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
                break
        } */
        sendMessage('放棄成功')
    }
}
</script>

<style lang="scss" scoped>
.v-btn--absolute.v-btn--bottom, .v-btn--fixed.v-btn--bottom {
    bottom: 16px !important;
}
</style>
