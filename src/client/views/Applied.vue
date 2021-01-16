<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary" style="z-index: 1")
        v-toolbar-title 應徵管理

    v-card(flat, :loading="loading")
        v-list(two-line, v-if="applyments.length > 0")
            template(v-for="({ job, state, _id }, i) in applyments")
                v-list-group
                    template(#activator)
                        v-list-item-content
                            v-list-item-title
                                h3 {{ job.title }}

                            v-list-item-subtitle
                                v-chip.mr-1(
                                    x-small,
                                    color="primary",
                                    :key="i",
                                    v-for="(tag, i) in job.tags"
                                ) {{ tag }}

                        v-list-item-avatar(tile, width="60")
                            v-chip(small, dark, :color="getColor(state)") {{ getText(state) }}

                    v-card(flat)
                        v-card-actions
                            v-spacer
                            v-btn(
                                outlined,
                                color="secondary",
                                :to="`/job/${job._id}`"
                            ) 查看
                            v-btn(
                                outlined,
                                color="error",
                                :disabled="!isAbandonable(state)",
                                @click="abandon(_id)"
                            ) 放棄
                            v-btn(
                                outlined,
                                color="primary",
                                :disabled="!isConfirmable(state)",
                                @click="confirm(_id)"
                            ) 確認

                v-divider

        v-card-text.text-center(v-else)
            v-avatar(size="300")
                v-img(:src="require('@/client/assets/empty.png')")
            .text-h5 還沒有應徵工作喔
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '@/client/sysmsg'
import { IAccount, IApplyment, IJob } from '@/server/models'
import { ApplymentState as State } from '@/server/enums'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Account.State account!: IAccount

    applyments: IApplyment[] = []
    loading = false

    getColor(state: State) {
        switch (state) {
            case State.Pending:
                return 'secondary'
            case State.Accepted:
                return 'light-blue'
            case State.Rejected:
                return 'red'
            case State.Abandoned:
                return 'red'
            case State.Confirmed:
                return 'green'
            case State.Finished:
                return 'deep-purple darken-1'
        }
    }

    getText(state: State) {
        switch (state) {
            case State.Pending:
                return '等待中'
            case State.Accepted:
                return '待確認'
            case State.Rejected:
                return '拒絕'
            case State.Abandoned:
                return '已放棄'
            case State.Confirmed:
                return '進行中'
            case State.Finished:
                return '完成'
        }
    }

    isAbandonable(state: State) {
        return state < State.Abandoned
    }

    isConfirmable(state: State) {
        return state === State.Accepted
    }

    async abandon(id: string) {
        let { status } = await axios.post(`/api/applyment/${id}/abandon`)
        switch (status) {
            case 200:
                let x = this.applyments.find((x: any) => x._id == id)
                if (x) {
                    x.state = State.Abandoned
                }
                break

            default:
                break
        }
    }

    async confirm(id: string) {
        let { status } = await axios.post(`/api/applyment/${id}/confirm`)
        switch (status) {
            case 200:
                let x = this.applyments.find((x: any) => x._id == id)
                if (x) {
                    x.state = State.Confirmed
                }
                break

            default:
                break
        }
    }

    async loadApplyments() {
        this.loading = true
        const { data } = await axios.get('/api/applyment')
        this.loading = false

        this.applyments = data
    }

    mounted() {
        this.loadApplyments()
    }
}
</script>

<style lang="scss" scoped>
.v-btn--absolute.v-btn--bottom,
.v-btn--fixed.v-btn--bottom {
    bottom: 16px !important;
}
</style>
