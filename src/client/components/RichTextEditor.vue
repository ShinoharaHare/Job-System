<template lang="pug">
textarea.simplemde-container(ref="container")
</template>


<script lang="ts">
import { Vue, Component, Watch, Ref, Prop } from 'vue-property-decorator'

import SimpleMDE from 'simplemde'

@Component
export default class extends Vue {
    @Prop() height!: string | number
    @Prop() maxHeight!: string | number
    @Prop() readOnly!: boolean
    @Prop() hideToolbar!: boolean
    @Prop() hideStatus!: boolean
    @Ref() readonly textarea!: HTMLTextAreaElement

    simplemde!: SimpleMDE
    codeMirror!: any

    setContent(content: string) {
        this.simplemde.value(content)
    }

    getContent() {
        return this.simplemde.value()
    }

    togglePreview() {
        let simplemde: any = this.simplemde
        simplemde.togglePreview()
    }

    refresh() {
        this.togglePreview()
        this.togglePreview()
    }

    
    mounted() {
        this.simplemde = new SimpleMDE({
            element: this.textarea,
            toolbar: this.hideToolbar,
            status: this.hideStatus != undefined ? false : ["autosave", "lines", "words", "cursor"]
        })
        this.codeMirror = document.querySelector('.CodeMirror')
        this.codeMirror.style.height = this.height
        this.codeMirror.style.maxHeight = this.maxHeight

        if (this.readOnly != undefined) {
            this.togglePreview()
            this.simplemde.codemirror.options.readOnly = true
            let el = document.querySelector('.CodeMirror-code') as HTMLDivElement
            el.contentEditable = 'false'
        }
    }
}
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
@import "~@fortawesome/fontawesome-free/css/fontawesome.min.css";
</style>