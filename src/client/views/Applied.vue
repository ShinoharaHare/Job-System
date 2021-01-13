<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 應徵管理

    v-list(two-line)
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '@/client/sysmsg'
import { IAccount, IApplyment, IJob } from '@/server/models'

const Account = namespace('Account')

enum State {
    Pending = 0, // 初始狀態，等待刊登者回應
    Accepted, // 刊登者接受
    Confirmed, // 申請人確認,

    // 結束狀態
    Abandoned, // 申請人放棄
    Rejected, // 刊登者拒絕
    Finished // 完成
}

@Component
export default class extends Vue {
    @Account.State account!: IAccount

    applyments: IApplyment[] = []

    getColor(state: State) {
        switch (state) {
            case State.Pending:
                return 'secondary'
            case State.Accepted:
                return 'light-blue'
            case State.Rejected:
                return 'green'
            case State.Confirmed:
                return 'red'
            case State.Abandoned:
                return 'red'
        }
    }

    getText(state: State) {
        switch (state) {
            case State.Pending:
                return '等待中'
            case State.Accepted:
                return '雇主已接受'
            case State.Rejected:
                return '雇主已拒絕'
            case State.Confirmed:
                return '已確認'
            case State.Abandoned:
                return '已放棄'
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
        const { data } = await axios.get('/api/applyment')
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
