<template lang="pug">
v-card(flat, tile, height="100vh")
    v-toolbar(dark)
        v-btn(icon, to="/setting")
            v-icon mdi-arrow-left
        v-toolbar-title 履歷範本

    v-expansion-panels.mt-2(tile, accordion, multiple)
        v-expansion-panel(v-for="({ _id, name }, i) in list", :key="i")
            v-expansion-panel-header {{ name }}
            v-expansion-panel-content
                v-card-actions
                    v-spacer
                    v-btn(
                        outlined,
                        color="error",
                        :loading="loading",
                        @click="deleteResume(_id)"
                    ) 移除
                    v-btn(
                        outlined,
                        color="success",
                        :to="`/resume/${_id}/edit`"
                    ) 修改

    v-btn(fixed, bottom, right, fab, dark, color="primary", to="/resume/new")
        v-icon mdi-plus
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { sendMessage } from '../sysmsg'

@Component
export default class extends Vue {
    list: any[] = []
    loading = false

    
    async deleteResume(id: string) {
        this.loading = true
        const { status } = await axios.delete(`/api/account/resume/${id}`)
        this.loading = false

        switch (status) {
            case 204:
                this.list = this.list.filter(x => x._id != id)
                sendMessage('刪除成功')
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async getResumeData() {
        const { status, data } = await axios.get('/api/account/resume')
        this.list = data
    }

    mounted() {
        this.getResumeData()
    }

}
</script>