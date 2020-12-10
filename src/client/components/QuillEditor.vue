<template lang="pug">
#quill-container(height="100%")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Quill, { QuillOptionsStatic } from 'quill'

@Component
export default class extends Vue {
    @Prop({ default: {} })
    options!: QuillOptionsStatic

    @Prop({ default: false })
    noToolbar!: boolean

    quill!: Quill

    back() {
        this.$router.back()
    }

    get toolbar() {
        return this.noToolbar !== false ? false : [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'] // remove formatting button
        ]
    }

    mounted() {
        this.quill = new Quill('#quill-container', {
            ...this.options,
            modules: { toolbar: this.toolbar },
            theme: 'snow'
        })
        console.log(this.noToolbar)

        ; (window as any).quill = this.quill
    }
}
</script>

<style lang="scss" scoped>
</style>
