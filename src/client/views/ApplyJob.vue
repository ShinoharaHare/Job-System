<template lang="pug">
v-card(height="100vh")
    v-toolbar(dark)
        v-toolbar-title
            span.text-h6 應徵 
            span.text-h5 {{ job.title }}

    v-card-text
        v-select(
            outlined,
            label="選擇範本",
            :items="templates",
            @input="select($event)"
        )
        RichTextEditor(ref="editor", height="calc(100vh - 350px)")

    v-footer(fixed, padless)
        v-card(tile, width="100%")
            v-card-actions
                v-spacer
                v-btn(
                    outlined,
                    color="secondary",
                    @click="$router.replace(`/job/${id}`)"
                ) 取消
                v-btn(
                    outlined,
                    color="primary",
                    :loading="loading",
                    @click="apply"
                ) 提交履歷
                v-spacer

    v-dialog(v-model="warning")
        v-card
            v-card-title
                h4 不要翹課喔

            v-card-text 
                h3 請注意，此工作時間跟課表有衝突喔!

            v-card-actions
                v-spacer
                v-btn(outlined, color="primary", @click="warning = false") 我知道了
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '../sysmsg'
import { IAccount } from '@/server/models'

import RichTextEditor from '@/client/components/RichTextEditor.vue'


const Account = namespace('Account')

@Component({ components: { RichTextEditor } })
export default class extends Vue {
    @Account.State
    account!: IAccount

    @Ref() editor!: RichTextEditor

    job: any = {
        title: '',
        content: '',
        tags: [],
        time: []
    }

    loading = false
    warning = false

    get id() {
        return this.$route.params.id
    }

    get templates() {
        let templates: any[] = this.account?.resumeTemplates || []
        templates = templates.map((x, i) => ({
            text: x.name,
            value: i
        }))
        return templates
    }

    select(i: number) {
        let templates = this.account?.resumeTemplates || []
        this.editor.setContent(templates[i].content)
    }

    compareTime(dateStr1: string, dateStr2: string): number { // 1: >, -1: <, 0: ==
        return (Date.parse(`0 ${dateStr1}`) - Date.parse(`0 ${dateStr2}`)) / 1000
    }

    conflict(event1: any, event2: any): boolean {
        if (this.compareTime(event1.start, event2.start) <= 0) {
            if (this.compareTime(event1.end, event2.start) > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.compareTime(event2.end, event1.start) > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    checkTime() {
        for (let jobTime of this.job.time) {
            for (let event of this.account.events!) {
                if (event.weekday == jobTime.weekday) {
                    if (this.conflict(event, jobTime)) {
                        this.warning = true
                        return
                    }
                }
            }
        }
    }

    async apply() {
        this.loading = true
        let { status } = await axios.post('/api/applyment', {
            job: this.$route.params.id,
            resume: this.editor.getContent()
        })
        this.loading = false

        switch (status) {
            case 201:
                this.$router.replace(`/job/${this.id}`)
                sendMessage('應徵成功')
                break

            case 403:
                break

            case 409:
                break
        }
    }

    async loadJob() {
        let { status, data } = await axios.get(`/api/job/${this.id}`)

        if (status === 200) {
            this.job = data
            this.checkTime()
        }
    }

    mounted() {
        this.loadJob()
    }
}
</script>