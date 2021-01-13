<template lang="pug">
v-card(height="100vh")
    v-toolbar(dark)
        v-toolbar-title 應徵 {{ job.title }}

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
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '../sysmsg'

import RichTextEditor from '@/client/components/RichTextEditor.vue'
import { IAccount } from '@/server/models'

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
        }
    }

    mounted() {
        this.loadJob()
    }
}
</script>