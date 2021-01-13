<template lang="pug">
v-card(flat, tile, height="100%")
    JobEditor(ref="editor")

    v-footer(fixed, padless)
        v-card.flex(tile)
            v-card-actions
                v-spacer
                v-btn(
                    outlined,
                    color="error",
                    width="40%",
                    @click="$router.back()"
                ) 取消
                v-btn(
                    outlined,
                    color="primary",
                    width="40%",
                    :loading="loading",
                    @click="save"
                ) 儲存
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

import JobEditor from '@/client/components/JobEditor.vue'
import { sendMessage } from '../sysmsg'
import { IJob } from '@/server/models'

@Component({ components: { JobEditor } })
export default class extends Vue {
    @Ref() editor!: JobEditor

    job: IJob | null = null

    loading = false

    get id() {
        return this.$route.params.id
    }

    async loadJob() {
        const { status, data } = await axios.get(`/api/job/${this.id}`)

        switch (status) {
            case 200:
                this.job = data
                break
        }

        this.editor.setData(this.job!)
    }

    async save() {
        this.loading = true
        const { status, data } = await axios.put('/api/job', {
            data: this.editor.getData()
        })
        this.loading = false

        switch (status) {
            case 201:
                sendMessage('修改成功')
                break

            case 401:
            case 403:
        }

        this.$router.back()
    }

    mounted() {
        this.loadJob()
    }
}
</script>