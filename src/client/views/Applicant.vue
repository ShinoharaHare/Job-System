<template lang="pug">
v-card(tile)
    v-toolbar(dark)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left
        v-toolbar-title 應徵者

    div(style="height: calc(100vh - 56px)")
        v-container(fill-height, v-if="loading")
            v-row.fill-height(align-content="center", justify="center")
                v-col.subtitle-1.text-center(cols="12")
                    h1 正在讀取
                v-col(cols="6")
                    v-progress-linear(
                        color="primary",
                        indeterminate,
                        rounded,
                        height="10"
                    )

        v-list(v-if="!loading")
            template(v-for="(x, i) in applyments")
                v-list-group(:key="i")
                    template(#activator)
                        v-list-item-icon
                            v-icon mdi-account
                        v-list-item-content
                            v-list-item-title
                                h3 {{ x.applicant.personal.nameZH }}

                        v-list-item-avatar(width="80")
                            v-chip(dark, small, :color="getColor(x.state)") 
                                | {{ getText(x.state) }}

                    v-card(flat)
                        v-card-actions
                            v-spacer
                            v-btn(outlined, @click="showResume(x)") 履歷

                            v-btn(
                                outlined,
                                color="yellow darken-1",
                                @click="finish(x._id)",
                                v-if="isFinishable(x.state)"
                            ) 完成

                            v-btn(
                                outlined,
                                color="error",
                                @click="reject(x._id)",
                                v-if="isRejectable(x.state)"
                            ) 拒絕

                            v-btn(
                                outlined,
                                color="success",
                                @click="accept(x._id)",
                                v-if="isAcceptable(x.state)"
                            ) 接受

    ResumeDialog(v-model="dialog", :applyment="selected")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { sendMessage } from '@/client/sysmsg'
import { ApplymentState as State } from '@/server/enums'

import ResumeDialog from '@/client/components/ResumeDialog.vue'

@Component({ components: { ResumeDialog } })
export default class extends Vue {
    loading = false
    dialog = false
    applyments: any[] = []
    selected: any = null

    get id() {
        return this.$route.params.id
    }

    getColor(state: State) {
        switch (state) {
            case State.Pending:
                return 'blue'
            case State.Accepted:
                return 'secondary'
            case State.Rejected:
                return 'red'
            case State.Confirmed:
                return 'green'
            case State.Abandoned:
                return 'red'
        }
    }

    getText(state: State) {
        switch (state) {
            case State.Pending:
                return '待回應'
            case State.Accepted:
                return '待確認'
            case State.Rejected:
                return '已拒絕'
            case State.Confirmed:
                return '已確認'
            case State.Abandoned:
                return '已放棄'
        }
    }

    showResume(applyment: any) {
        this.dialog = true
        this.selected = applyment
    }

    isRejectable(state: State) {
        return state == State.Pending
    }

    isAcceptable(state: State) {
        return state == State.Pending
    }

    isFinishable(state: State) {
        return state == State.Confirmed
    }

    async reject(id: any) {
        const { status } = await axios.post(`/api/applyment/${id}/reject`)
        switch (status) {
            case 200:
                let x = this.applyments.find((x: any) => x._id == id)
                x.state = State.Rejected
                sendMessage('拒絕成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async accept(id: any) {
        const { status } = await axios.post(`/api/applyment/${id}/accept`)
        switch (status) {
            case 200:
                let x = this.applyments.find((x: any) => x._id == id)
                x.state = State.Accepted
                sendMessage('接受成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async finish(id: any) {
        const { status } = await axios.post(`/api/applyment/${id}/finish`)
        switch (status) {
            case 200:
                let x = this.applyments.find((x: any) => x._id == id)
                x.state = State.Finished
                sendMessage('成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async loadApplyments() {
        let { status, data } = await axios.get('/api/applyment', { params: { job: this.id } })
        if (status === 200) {
            this.applyments = data
        }
    }

    mounted() {
        this.loadApplyments()
    }
}
</script>