<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(tile)
        v-toolbar(dark, color="primary")
            v-toolbar-title {{title}}

        v-card-text
            RichTextEditor(ref="textContent")
            //- v-textarea(
            //-     auto-grow,
            //-     height="550",
            //-     background-color="grey lighten-4",
            //-     v-model="content"
            //- )

        v-footer(absolute, padless)
            v-card(tile, width="100%")
                v-card-actions
                    v-text-field.mx-4(v-model="name")
                    v-btn(color="error" @click="changeValue(false)") 取消
                    v-btn(color="success" @click="updateResume()") 確認
</template>

<script lang="ts">
import { Vue, Component, Prop,Ref,Watch } from 'vue-property-decorator'
import { sendMessage } from '../sysmsg'

import RichTextEditor from '@/client/components/RichTextEditor.vue'
import { watch } from 'fs';


@Component({ components: { RichTextEditor } })
export default class extends Vue {
    @Ref('textContent') readonly textContent!: RichTextEditor;

    @Prop()
    value!: boolean

    @Prop({default: null})
    resume!:any

    @Prop({default: null})
    userID!:any

    loading = false
    name = ''
    title = '新增履歷'

    content = ''

    changeValue(v: boolean) {
        this.$emit('input', v)
    }

    // async getName() {
    //     const { status, data } = await axios.get('/api/account', {
    //         params: { fields: ['personal'] }
    //     })

    //     switch (status) {
    //     case 200:
    //         this.name = data.personal.nameZH
    //         break
    //     }
    // }

    async updateResume() {
        this.loading = true
        if(this.title == '新增履歷'){
            const {status} = await axios.post('/api/account/addResume',{userID:this.userID,name:this.name,content:this.content})
            this.loading = false

            switch (status) {
            case 200:
                window.location.reload()
                sendMessage('新增成功')
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
            }
        }
        else if(this.title == '編輯履歷'){
            this.textContent.getContent()
            const {status} = await axios.post('/api/account/updateResume',{userID:this.userID,resumeID:this.resume._id,name:this.name,content: this.textContent.getContent()})
            this.loading = false
            switch (status) {
            case 200:
                window.location.reload()
                sendMessage('編輯成功')
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
            }
        }
    
    }
    
    async mounted() {
        if(this.resume != null){
            this.title = '編輯履歷'
            this.name = this.resume.name
            this.content = this.resume.content
            setTimeout(() => {
                this.textContent.setContent(this.content)
            }, 1000)
            
        }
        // console.log(this.resume.content)
        // this.name = this.resume.name;
        //this.textContent.setContent(this.name)
        //console.log(this.state)
        //this.$refs.textContent.setContent(content)
        
    }
   
}
</script>

<style lang="scss" scoped>

</style>
