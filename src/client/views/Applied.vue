<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title
            h3.ma-5 已應徵之工作

    v-list(three-line)
        span(v-for="({ state }, index) in applyments", :key="index")
            v-list-item(@click="showJob")
                v-list-item-content.mx-5
                    v-list-item-title
                        h3 {{ jobInfos[index].title }}
                    v-list-item-subtitle
                        div(display="flex")
                            span(v-for="( tag, i) in jobInfos[index].tags", :key="i") \#{{ tag }} 
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
import { IJob } from '@/server/models'
import mongoose from 'mongoose'

const Account = namespace('Account')
const Job = namespace('Job')

@Component
export default class extends Vue {
    @Account.State account!: IAccount
    @Job.State job!: IJob

    applyments: any = {
        job: '',
        state: Number
    }
    jobInfos: any[] = []
    testApplyments: any[] = []
    i!: number

    // 從 account 找 applyments
    async getApplyment() {
        const { data } = await axios.get('/api/applyment/', { params: { account: this.account._id } })
        return data
    }

    get count() {
        return this.applyments.length
    }

    showJob() {
        this.$router.push('/job')
    }

    async mounted() {
        this.applyments = await this.getApplyment()
        console.log(this.applyments[0]._id)

        // 拿 job 裡的 title
        for(this.i = 0; this.i<this.applyments.length; this.i++){
            const { status, data } = await axios.get(`/api/job/${ mongoose.Types.ObjectId(this.applyments[this.i].job) }`)
            switch (status) {
                case 200:
                    this.jobInfos.push(data)
                    break
                case 404:
                    // 導向到404頁面
                    // this.$router.replace('/404')
                    break
            }
        }
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
