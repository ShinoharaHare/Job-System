<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(flat, tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 履歷範本

        v-expansion-panels.mt-2(tile, accordion, multiple)
            v-expansion-panel(v-for="(resume, i) in list", :key="i")
                v-expansion-panel-header {{ resume.name }}
                v-expansion-panel-content
                    v-card-actions
                        v-spacer
                        v-btn(
                            color="error"
                            @click="deleteResume(i)"
                        ) 移除
                        v-btn(
                            color="success",
                            @click="selectedItem(resume)"
                        ) 修改
                        EditResumeDialog(v-model="showEditor" :resume="selectedResume" :userID="userID" )

        v-btn(
            fixed,
            bottom,
            right,
            fab,
            dark,
            color="primary",
            @click="selectedItem(newResume)"
        )
            v-icon mdi-plus

        EditResumeDialog(v-model="showEditor" v-bind:resume="selectedResume" :userID="userID" )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import EditResumeDialog from '@/client/components/EditResumeDialog.vue'
import { sendMessage } from '@/client/sysmsg'

@Component({ components: { EditResumeDialog } })
export default class extends Vue {
    @Prop()
    value!: boolean
    userID = ''
    list: any[] = []
    showEditor = false
    loading = false
    newResume = null
    selectedResume = null

    changeValue(v: boolean) {
        this.$emit('input', v)
    }
    selectedItem(resume:any){
        console.log(resume)
        this.selectedResume = resume
        this.showEditor = true
    }
    async deleteResume(i: number) {
        this.loading = true
        console.log(this.list[i]._id)
        const { status } = await axios.post('/api/account/deleteResume',{userID:this.userID,resumeID:this.list[i]._id})        //id待寫
        

        switch (status) {
        case 200:
            //this.$router.replace('/setting')
            window.location.reload()
            sendMessage('刪除成功')
            break

        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
        this.loading = false
    
    }
    async getResumeData(){
        const { status, data } = await axios.get('/api/account', {
            params: { fields: ['resumeTemplates','_id'] }
        })
        this.list = data.resumeTemplates
        this.userID = data._id
        // console.log(this.userID)
    }

    mounted() {
        this.getResumeData()
    }
}
</script>

<style lang="scss" scoped>
</style>
