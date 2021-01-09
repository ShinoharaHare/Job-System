<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(tile)
        v-toolbar(dark, color="primary")
            v-toolbar-title 編輯履歷

        v-card-text
            QuillEditor()
            //- v-textarea(
            //-     auto-grow,
            //-     height="550",
            //-     background-color="grey lighten-4",
            //-     v-model="content"
            //- )

        v-footer(absolute, padless)
            v-card(tile, width="100%")
                v-card-actions
                    v-text-field.mx-4
                    v-btn(color="error" @click="changeValue(false)") 取消
                    v-btn(color="success" @click="updateResume()") 確認
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import QuillEditor from '@/client/components/QuillEditor.vue'
import { sendMessage } from '@/client/sysmsg'

@Component({ components: { QuillEditor } })
export default class extends Vue {
    @Prop()
    value!: boolean

    loading = false
    name = ''

    content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'

    changeValue(v: boolean) {
        this.$emit('input', v)
    }

    async getName() {
        const { status, data } = await axios.get('/api/account', {
            params: { fields: ['personal'] }
        })

        switch (status) {
        case 200:
            this.name = data.personal.nameZH
            break
        }
    }

    async updateResume() {
        this.loading = true
        this.getName()
        const content = this.content
        const { status, data } = await axios.post('/api/account/resumeTemplates', { name, content })
        this.loading = false

        switch (status) {
        case 200:
            this.$router.replace('/ResumeTemplatesDialog')
            sendMessage('修改成功')
            break

        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    
    }

    mounted() {

    }
}
</script>

<style lang="scss" scoped>
</style>
