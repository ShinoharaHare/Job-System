<template lang="pug">
v-card(tile, height="100vh")
    v-toolbar(dark, color="primary")
        v-toolbar-title 刊登管理

    v-card(flat :loading="loading")
        v-list(two-line, v-if="jobs.length > 0")
            template(v-for="({ title, _id, finish }, i) in jobs")
                v-list-group(:key="i")
                    template(#activator)
                        v-list-item-content.mx-5
                            v-list-item-title
                                h3 {{ title }}
                            v-list-item-subtitle
                                v-chip.mr-1(
                                    x-small,
                                    color="primary",
                                    :key="i",
                                    v-for="(tag, i) in jobs.tags"
                                ) {{ tag }}

                        v-list-item-avatar(width="70")
                            v-chip(:color="finish ? 'error' : 'success'") {{ finish ? '已結束' : '招募中' }}

                    v-card(flat)
                        v-card-actions
                            v-spacer
                            v-btn.mr-1(
                                outlined,
                                color="error",
                                @click="showDeleteDialog(_id)"
                            ) 刪除

                            v-btn.mr-1(
                                outlined,
                                color="secondary",
                                @click="finishJob(_id)",
                                v-if="!finish"
                            ) 結束

                            v-btn.mr-1(
                                outlined,
                                color="primary",
                                :to="`/job/${_id}/edit`"
                            ) 修改

                            v-btn.mr-1(
                                outlined,
                                color="warning",
                                :to="`/job/${_id}/applicant`"
                            ) 應徵者

                            v-dialog(v-model="deleteDialog.show")
                                v-card
                                    v-card-title 確定要刪除此工作嗎?
                                    v-card-actions
                                        v-spacer
                                        v-btn(
                                            outlined,
                                            color="error",
                                            :loading="deleteDialog.loading",
                                            @click="deleteJob"
                                        ) 刪除
                                        v-btn(
                                            outlined,
                                            @click="deleteDialog.show = false"
                                        ) 取消

                v-divider
        v-card-text.text-center(v-else)
            v-avatar(size="300")
                v-img(:src="require('@/client/assets/empty.png')")
            .text-h5 還沒有刊登工作喔

    v-btn(fixed, bottom, right, fab, dark, color="primary", to="/job/new")
        v-icon mdi-plus
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IAccount } from '@/server/models'
import { sendMessage } from '../sysmsg'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Account.State account!: IAccount
    jobs: any[] = []
    loading = false

    deleteDialog = {
        show: false,
        id: '',
        loading: false
    }

    applyments: any[] = []

    showDeleteDialog(id: string) {
        this.deleteDialog.show = true
        this.deleteDialog.id = id
    }

    async finishJob(id: string) {
        let { status } = await axios.post(`/api/job/${id}/finish`)
        if (status === 200) {
            let x = this.jobs.find((x) => x._id == id)
            x.finish = true
        }
    }

    async loadJobs() {
        this.loading = true
        let { status, data } = await axios.get('/api/job/published')
        this.loading = false
        if (status === 200) {
            this.jobs = data
        }
    }

    async deleteJob() {
        let id = this.deleteDialog.id

        this.deleteDialog.loading = true
        let { status } = await axios.delete(`/api/job/${id}`)
        this.deleteDialog.loading = false

        if (status === 204) {
            this.jobs = this.jobs.filter(x => x._id != id)
            this.deleteDialog.show = false
            sendMessage('刪除成功')
        }
    }

    mounted() {
        this.loadJobs()
    }


}
</script>

<style lang="scss" scoped>
.v-btn--fixed.v-btn--bottom {
    bottom: 64px !important;
}
</style>
