<template lang="pug">
v-card(tile, height="100vh")
    v-toolbar(dark)
        v-btn(icon, to="/resume")
            v-icon mdi-arrow-left
        v-toolbar-title 新建履歷範本

    v-card-text
        ResumeEditor(ref="editor")

    v-footer(fixed, padless)
        v-card(tile, width="100%")
            v-card-actions
                v-spacer
                v-btn(outlined, width="30%", color="error", to="/resume") 取消
                v-btn(
                    outlined,
                    width="50%",
                    color="success",
                    :loading="loading",
                    @click="create"
                ) 新建
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { sendMessage } from '../sysmsg'

import ResumeEditor from '@/client/components/ResumeEditor.vue'

@Component({ components: { ResumeEditor } })
export default class extends Vue {
    @Ref() editor!: ResumeEditor

    name = ''
    loading = false

    async create() {
        this.loading = true
        const { status } = await axios.post('/api/account/resume', this.editor.getData())
        this.loading = false

        switch (status) {
            case 201:
                sendMessage('新增成功')
                this.$router.back()
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }
    mounted(){
        const content = `# **中文名(ex:林孟翰)**
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
        this.editor.setText(content)
    }
}
</script>