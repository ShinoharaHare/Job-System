<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title
            h3.ma-5 已應徵之工作

    v-list(two-line)
        template(v-for="({ job, state }, i) in applyments")
            v-list-item(@click="toJob(job._id)", :key="i")
                v-list-item-content.mx-5
                    v-list-item-title
                        h3 {{ job.title }}

                    v-list-item-subtitle
                        v-chip.mr-1(
                            x-small,
                            color="primary",
                            :key="i",
                            v-for="(tag, i) in job.tags"
                        ) {{ tag }}

                v-avatar(tile, width="100")
                    v-chip(small, :color="getColor(state)") {{ getText(state) }}

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
    Rejected, // 刊登者拒絕
    Abandoned, // 申請人放棄
    Confirmed, // 申請人確認,
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

    // 從 account 找 applyments
    async getApplyment() {
        const { data } = await axios.get('/api/applyment')
        this.applyments = data
    }

    toJob(id: string) {
        this.$router.push(`/job/${id}`)
    }

    mounted() {
        this.getApplyment()
    }
}
</script>

<style lang="scss" scoped>
.v-btn--absolute.v-btn--bottom,
.v-btn--fixed.v-btn--bottom {
    bottom: 16px !important;
}
</style>
