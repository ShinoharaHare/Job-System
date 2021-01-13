<template lang="pug">
div
    v-text-field.mx-4(v-model="name", label="履歷標題")
    RichTextEditor(ref="editor", height="calc(100vh - 350px)")
</template>


<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

import RichTextEditor from '@/client/components/RichTextEditor.vue'

@Component({ components: { RichTextEditor } })
export default class extends Vue {
    @Ref() editor!: RichTextEditor
    name = ''

    getData() {
        return {
            name: this.name,
            content: this.editor.getContent()
        }
    }

    setData(data: any) {
        this.name = data.name
        this.editor.setContent(data.content)
    }

    setText(text:any) {
        this.editor.setContent(text)
    }
}

</script>