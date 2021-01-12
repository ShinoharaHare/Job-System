<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(tile)
        v-toolbar(dark, color="primary")
            v-toolbar-title {{title}}

        v-card-text
            v-text-field.mx-4(v-model="name" label="履歷標題")
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
                    v-spacer
                    v-btn(width="30%" color="error" @click="changeValue(false)") 取消
                    v-btn(width="50%" color="success" @click="updateResume()") 確認
</template>

<script lang="ts">
import { Vue, Component, Prop,Ref,Watch } from 'vue-property-decorator'
import { sendMessage } from '../sysmsg'

import RichTextEditor from '@/client/components/RichTextEditor.vue'
import { watch } from 'fs';


@Component({ components: { RichTextEditor } })
export default class extends Vue {
    @Ref('textContent') textContent!: RichTextEditor;

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

    async changeValue(v: boolean) {
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
            const {status} = await axios.post('/api/account/addResume',{userID:this.userID,name:this.name,content:this.textContent.getContent()})
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
    @Watch('resume',{immediate:true})
    resumeChanged(oldValue: any, newValue: any){
        console.log(this.resume)
        if(this.resume != null){
            this.title = '編輯履歷'
            this.name = this.resume.name
            this.content = this.resume.content
            setTimeout(() => {
                this.textContent.setContent(this.content)
            }, 500)
            
        }
        else{
            this.title = '新增履歷'
            this.name = ''
            this.content = `# **中文名(ex:何文子)**
<br>

#### 英文名(ex:Wayne)
#### 年紀(ex:21)
#### 電話(ex:0912345678)
#### 信箱(ex:123@gmail.com)
#### 駕照(ex:汽、機車)
<br>

## 教育程度
<br>

* ### 國立台灣海洋大學 資訊工程學系 2018-2022
<br>

## 語言能力
<br>

* ### 英文-- 聽 /需加強、說 /尚可、讀 /精通、寫 /尚可
* ### 台語-- 聽 /尚可、說 /尚可
<br>

## 其他技能
<br>

* ### 能搬重物
*  ### 精通Microsoft Office
`
            setTimeout(() => {
                this.textContent.setContent(this.content)
            }, 2500)
        }
    }
    
    mounted() {
    }
   
}
</script>

<style lang="scss" scoped>

</style>
