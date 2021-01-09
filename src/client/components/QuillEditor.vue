<template lang="pug">
#quill-container(height="100%")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Quill, { QuillOptionsStatic } from 'quill'
import { Action } from 'vuex-class'

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

    deltaToJSONStr(deltaObj: any) {
        return JSON.stringify(deltaObj).replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
    }

    loadDefault() {
        let defaultContent = '{"ops":[{"attributes":{"bold":true},"insert":"工作標題"},{"insert":": (標題)\n"},{"attributes":{"bold":true},"insert":"工作待遇"},{"insert":": (薪資 $XXX~$XXX/月)\n"},{"attributes":{"bold":true},"insert":"工作性質"},{"insert":": (長期、短期...)\n"},{"attributes":{"bold":true},"insert":"工作內容"},{"insert":": \n\t"},{"attributes":{"list":"ordered"},"insert":"\n"},{"attributes":{"bold":true},"insert":"要求條件"},{"insert":": \n(學歷、資歷...)"},{"attributes":{"list":"ordered"},"insert":"\n"},{"attributes":{"bold":true},"insert":"需求人數"},{"insert":": (1人/不限)\n"},{"attributes":{"bold":true},"insert":"聯絡資訊"},{"insert":": (連絡方式、面試時間)\n"},{"attributes":{"bold":true},"insert":"其他資訊"},{"insert":": \n"}]}'
        defaultContent = defaultContent.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
        // console.log(JSON.parse(defaultContent));
        this.quill.setContents(JSON.parse(defaultContent))
    }

    getContent() {
        return this.deltaToJSONStr(this.quill.getContents())
    }
}
</script>

<style lang="scss" scoped>
</style>
