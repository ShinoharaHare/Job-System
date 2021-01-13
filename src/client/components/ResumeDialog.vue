<template lang="pug">
v-dialog(eager, :value="value")
    v-card(tile)
        v-toolbar(dark)
            v-btn(icon, @click="$emit('input', false)")
                v-icon mdi-close
            //- v-toolbar-title 履歷

        RichTextEditor(
            hideToolbar,
            hideStatus,
            readOnly,
            ref="editor",
            height="calc(100vh - 56px)"
        )

        //- v-footer(fixed, padless)
        //-     v-card(tile, width="100%")
        //-         v-card-actions
        //-             v-spacer
        //-             v-btn(
        //-                 color="error",
        //-                 width="100",
        //-                 v-if="applyment.state == 0",
        //-                 @click="reject(candidate.id)"
        //-             ) 拒絕
        //-             v-spacer
        //-             v-btn(
        //-                 color="success",
        //-                 width="100",
        //-                 v-if="applyment.state == 0",
        //-                 @click="accept(candidate.id)"
        //-             ) 接受
        //-             v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { sendMessage } from '@/client/sysmsg'
import { IApplyment } from '@/server/models'

import RichTextEditor from '@/client/components/RichTextEditor.vue'


@Component({ components: { RichTextEditor } })
export default class extends Vue {
    @Prop() value!: boolean
    @Prop() applyment!: IApplyment
    @Ref() editor!: RichTextEditor

    async reject(id: any) {
        const { status } = await axios.post(`/api/applyment/${id}/reject`)
        switch (status) {
            case 200:
                sendMessage('拒絕成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async accept(id: any) {
        const { status } = await axios.post(`/api/applyment/${id}/accept`)
        switch (status) {
            case 200:
                sendMessage('接受成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    @Watch('applyment')
    onApplymentChanged(val: any, prev: any) {
        this.editor.setContent(val.resume)
        this.editor.refresh()
    }
}
</script>

<style lang="scss" scoped>
</style>
