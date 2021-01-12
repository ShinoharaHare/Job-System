<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card.px-12(justify="space-around" )
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 應徵者
        v-container(style="height: 400px;" v-if="loading")
            v-row.fill-height(align-content="center" justify="center")
                v-col.subtitle-1.text-center(cols="12")
                    h1 正在讀取
                v-col(cols="6")
                    v-progress-linear(color="primary" indeterminate="" rounded="" height="10")

        v-expansion-panels.mt-12(tile, popout, focusable v-if="!loading")
            v-expansion-panel(v-for="({ name,resume }, i) in candidates", :key="i")
                v-expansion-panel-header.pa-5
                    v-list-item
                        v-list-item-avatar
                            v-icon(large) mdi-account-outline
                        v-list-item-content
                            v-list-item-title.text-h6 {{ name }}

                v-expansion-panel-content

                    v-card-actions
                        v-spacer
                        v-btn(color="error") 拒絕
                        v-btn(color="success") 接受
                        v-btn(color="warning", @click="showResume(resume)") 詳細資料

        ResumeDialog(v-model="show" :content="selectedResume")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ResumeDialog from '@/client/components/ResumeDialog.vue'
import applyment from '@/server/routes/api/applyment'

@Component({ components: { ResumeDialog } })
export default class extends Vue {
    @Prop()
    value!: boolean

    @Prop({default: null})
    applyment: any

    names:any = []
    candidates:any
    show = false
    selectedResume = null
    loading = true

    changeValue(v: boolean) {
        this.$emit('input', v)
    }

    showResume(resume:any) {
        this.selectedResume = resume
        if(this.selectedResume != null){
            this.show = true
        }
    }

    async getNames(candidates:any){
        for(let i=0;i<candidates.length;i++){
            const { data } = await axios.get('/api/applyment/name', { params: { candidateID: candidates[i].applicant } })
            this.candidates[i].name = data.personal.nameZH
            
        }
        this.loading = false
    }

    @Watch('applyment',{immediate:true})
    applymentChanged(oldValue: any, newValue: any){
        if(this.applyment != null){
            this.loading = true
            this.names = null
            console.log(this.applyment.data)
            
            this.candidates = this.applyment.data
            this.getNames(this.applyment.data)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
