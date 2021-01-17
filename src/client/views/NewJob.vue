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
                v-btn(
                    outlined,
                    color="primary",
                    width="40%",
                    :loading="loading",
                    @click="submit"
                ) 新建
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

import JobEditor from '@/client/components/JobEditor.vue'
import { sendMessage } from '../sysmsg'

@Component({ components: { JobEditor } })
export default class extends Vue {
    @Ref() editor!: JobEditor
    loading = false

    async submit() {
        let d = this.editor.getData()
        if (!d.title) {
            sendMessage('請填寫標題', { color: 'warning', timeout: 1000 })
            return
        }
        this.loading = true
        const { status, data } = await axios.post('/api/job', {
            data: d
        })
        this.loading = false

        switch (status) {
            case 201:
                sendMessage('新建成功')
                break

            case 401:
            case 403:
        }

        this.$router.back()
    }

    mounted() {
        this.editor.content.setContent(`### 公司名稱
和蚊子便利商店

### 工作內容
* #### 打包作業
* #### 接待客人
* #### 整理清潔環境
* #### 外送服務
<br> 

### 待遇
時薪 $160 

### 需求人數
1人

### 工作地點
基隆市中正區北寧路2號`)
    }
}
</script>

<style lang="scss" scoped>
</style>