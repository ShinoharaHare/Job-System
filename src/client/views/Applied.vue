<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title
            h3.ma-5 已應徵之工作

    v-list(three-line)
        span(v-for="({ title, publisher, state }, index) in applyments", :key="index")
            v-list-item(@click="showJob")
                v-list-item-content.mx-5
                    v-list-item-title
                        h3 {{ title }}
                    v-list-item-subtitle
                        div(display="flex") {{ publisher }}
                            v-chip(color="normal", v-if="state == 0") 尚未回應
                            v-chip(color="primary", v-else-if="state == 1") 雇主已接受
                            v-chip(color="success", v-else-if="state == 2") 已確認
                            v-chip(color="error", v-else-if="state == 3 || state == 5") 已放棄
                            v-chip(color="error", v-else-if="state == 4") 雇主已拒絕

            v-divider(v-if="index < count - 1")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '@/client/sysmsg'
import { IAccount } from '@/server/models'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Account.State account!: IAccount

    applyments: any[] = []
    jobInfos: any[] = []
    testApplyments: any[] = []

    // 從 account 找 applyments
    async getApplyment() {
        const { data } = await axios.get('/api/applyment/', { params: { account: this.account._id } })
        return data
    }

    // 拿 job 裡的 title 和 publisher
    async getJobInfo() {
        const { data } = await axios.get('/api/job/:id')
        return data
    }

    get count() {
        return this.testApplyments.length
    }

    showJob() {
        this.$router.push('/job')
    }

    async mounted() {
        this.applyments = await this.getApplyment()
        this.jobInfos = await this.getJobInfo()

        /*
        for (let i = 0; i < 6; i++) {
            this.testApplyments.push({
                title: '工讀生',
                publisher: 'WJ股份有限公司',
                state: i
                            0: (雇主尚未回應)
                            1: (雇主接受，求職者尚未回應)
                            2: (雇主接受，求職者接受)
                            3: (雇主接受，求職者拒絕)
                            4: (雇主拒絕)
                            5: (求職者放棄)

            })
        }
        */
    }
}
</script>

<style lang="scss" scoped>
.v-btn--absolute.v-btn--bottom, .v-btn--fixed.v-btn--bottom {
    bottom: 16px !important;
}
.v-chip {
    float: right;
}
</style>
