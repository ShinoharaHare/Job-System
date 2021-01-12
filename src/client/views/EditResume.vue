<template lang="pug">
v-card(tile, height="100vh")
    v-toolbar(dark)
        v-btn(icon, to="/resume")
            v-icon mdi-arrow-left
        v-toolbar-title 修改履歷

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
                    @click="save"
                ) 儲存
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { sendMessage } from '../sysmsg'

import ResumeEditor from '@/client/components/ResumeEditor.vue'

@Component({ components: { ResumeEditor } })
export default class extends Vue {
    @Ref() editor!: ResumeEditor

    loading = false

    get id() {
        return this.$route.params.id
    }

    async loadData() {
        let { status, data } = await axios.get(`/api/account/resume/${this.id}`)

        switch (status) {
            case 200:
                this.editor.setData(data)
                break
        }
    }

    async save() {
        this.loading = true

        let { status, data } = await axios.put(`/api/account/resume/${this.id}`, this.editor.getData())

        switch (status) {
            case 200:
                sendMessage('更新成功')
                break
        }

        this.loading = false
    }

    mounted() {
        this.loadData()
    }
}
</script>