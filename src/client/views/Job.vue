<template lang="pug">
v-card.wrapper(tile, height="100%")
    v-toolbar(dark)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left
        | {{ job.title }}
        v-spacer

    v-card.pa-4.pt-0(flat)
        v-container(fluid)
            v-row
                v-col
                    RichTextEditor(
                        hideToolbar,
                        hideStatus,
                        readOnly,
                        max-height="calc(100vh - 112px)",
                        ref="editor"
                    )

            v-row
                v-col 
                    TagPicker(readOnly, ref="tagPicker", label="標籤")

            v-row
                v-col
                    v-card(outlined)
                        v-card-title 工作時間
                        v-data-table(
                            disable-sort,
                            disable-pagination,
                            hide-default-footer,
                            :mobile-breakpoint="0",
                            :headers="headers",
                            :items="job.time"
                        )

    v-footer(fixed, padless)
        v-card(tile, width="100%")
            v-card-actions
                span(v-if="isLogin")
                    v-btn(
                        icon,
                        large,
                        @click="unfavorite(id)",
                        v-if="isFavorite"
                    )
                        v-icon(color="pink") mdi-heart

                    v-btn(icon, large, @click="favorite(id)", v-else)
                        v-icon mdi-heart-outline

                v-btn.mx-auto(
                    outlined,
                    color="primary",
                    width="70%",
                    @click="apply",
                    v-if="!isApplied"
                    :to="`/job/${id}/apply`"
                ) 我要應徵
                
                span(v-else)
                    v-btn(
                        outlined,
                        color="red",
                        @click="abandon",
                        v-if="isApplied.state == 0 || isApplied.state == 1"
                    ) 放棄

                    v-btn(
                        outlined,
                        color="primary",
                        @click="confirm",
                        v-if="isApplied.state == 1"
                    ) 確認
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IAccount, IJob, IApplyment, Applyment } from '@/server/models'
import { sendMessage } from '../sysmsg'

import TagPicker from '@/client/components/TagPicker.vue'
import RichTextEditor from '@/client/components/RichTextEditor.vue'
import router from '@/server/routes/api/applyment'

const Account = namespace('Account')

@Component({ components: { RichTextEditor, TagPicker } })
export default class extends Vue {
    @Account.State account!: IAccount
    @Account.State isLogin!: boolean
    @Account.Action favorite!: Function
    @Account.Action unfavorite!: Function

    @Ref() editor!: RichTextEditor
    @Ref() tagPicker!: TagPicker

    job: any = {
        title: '',
        content: '',
        tags: [],
        time: []
    }

    isApplied: any = {
        state: Number
    }

    applymentsByJob: IApplyment[] = []

    headers = [
        { text: '星期(幾)', value: 'weekday', align: 'center' },
        { text: '開始時間', value: 'start', align: 'center' },
        { text: '結束時間', value: 'end', align: 'center' },
    ]

    get id() {
        return this.$route.params.id
    }

    get isFavorite() {
        return this.account.favorite!.findIndex((x: any) => x == this.id) != -1
    }

    setData(job: IJob) {
        this.job = job
        this.tagPicker.setData(job.tags)
        this.editor.setContent(job.content!)
        this.editor.refresh()
    }

    async loadJob() {
        const { status, data } = await axios.get(`/api/job/${this.id}`)

        switch (status) {
            case 200:
                this.setData(data)
                break
            case 404:
                // 導向到404頁面
                // this.$router.replace('/404')
                break
        }
    }

    async getApplyments(){
        const { data } = await axios.get('/api/applyment', { params: { job: this.id }})
        this.applymentsByJob = data
        this.isApplied = this.applymentsByJob.find(i => i.applicant === this.account._id)
    }

    async apply() {
        if(!this.isLogin){
            sendMessage('請先登入')
            this.$router.replace('/login')
        }

        else{
            let { status } = await axios.post('/api/applyment', {
            job: this.$route.params.id,
            resume: '履歷...'
            })

            switch (status) {
                case 201:
                    // this.$router.push('')
                    sendMessage('應徵成功')
                    break

                default:

            }
        } 
    }

    async abandon() {
        let { status } = await axios.post(`/api/applyment/${this.isApplied._id}/abandon`)
        switch (status) {
            case 200:
                sendMessage('放棄成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async confirm() {
        let { status } = await axios.post(`/api/applyment/${this.isApplied._id}/confirm`)
        switch (status) {
            case 200:
                sendMessage('確認成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    mounted() {
        this.loadJob()
        this.getApplyments()
    }
}
</script>

<style lang="scss" scoped>
.v-list-item__subtitle {
    margin-top: 4px;
    padding-left: 16px;
}

.wrapper {
    padding-top: 56px;
    padding-bottom: 60px;
}

.v-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
}
</style>
