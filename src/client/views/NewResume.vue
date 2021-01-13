<template lang="pug">
v-card(tile, height="100vh")
    v-toolbar(dark)
        v-btn(icon, to="/resume")
            v-icon mdi-arrow-left
        v-toolbar-title 新建履歷範本

    v-card-text
        ResumeEditor(ref="editor")

    v-footer(fixed, padless)
        v-card(tile, width="100%")
            v-card-actions
                v-spacer
                v-btn(outlined, width="30%", color="error", to="/resume") 取消
                v-btn(
                    outlined,
                    width="50%",
                    color="success",
                    :loading="loading",
                    @click="create"
                ) 新建
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { sendMessage } from '../sysmsg'

import ResumeEditor from '@/client/components/ResumeEditor.vue'

@Component({ components: { ResumeEditor } })
export default class extends Vue {
    @Ref() editor!: ResumeEditor

    name = ''
    loading = false

    async create() {
        this.loading = true
        const { status } = await axios.post('/api/account/resume', this.editor.getData())
        this.loading = false

        switch (status) {
            case 201:
                sendMessage('新增成功')
                this.$router.back()
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

}
</script>