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
                v-btn(outlined, color="primary", width="40%", @click="submit") 修改
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

import JobEditor from '@/client/components/JobEditor.vue'
import { sendMessage } from '@/client/sysmsg'


@Component({ components: { JobEditor } })
export default class extends Vue {
    @Ref()
    editor!: JobEditor

    job: any = {
        title: '',
        content: '',
        tags: [],
        time: []
    }

    get id() {
        return this.$route.params.id
    }

    async loadData() {
        
        const { status, data } = await axios.get(`/api/job/${this.id}`)

        switch (status) {
            case 200:
                this.job = data
                console.log(this.job)
                this.editor.setData(this.job)
                // this.editor.refresh()
                break
            case 404:
                // 導向到404頁面
                // this.$router.replace('/404')
                break
        }
    }

    async submit(){
        const {status} = await axios.patch(`/api/job/${this.id}`,{data:this.editor.getData()})
        switch (status) {
            case 200:
                sendMessage('修改成功')
                this.$router.replace('/published')
                break
            case 404:
                sendMessage('未知的錯誤', { color: 'error' })
                break
        }
    }

    mounted() {
        this.loadData()
    }
}
</script>

<style lang="scss" scoped>
</style>