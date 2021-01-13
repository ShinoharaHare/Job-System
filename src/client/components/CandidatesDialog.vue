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
            v-expansion-panel(v-for="candidate, i in candidates", :key="i")
                v-expansion-panel-header.pa-5
                    v-list-item
                        v-list-item-avatar
                            v-icon(large) mdi-account-outline
                        v-list-item-content
                            v-list-item-title.text-h6 {{ candidate.name }}
                        v-avatar(tile, width="100")
                            v-chip(small, :color="getColor(candidate.state)") {{ getText(candidate.state)}}

                v-expansion-panel-content

                    v-card-actions
                        v-spacer
                        v-btn(color="error" v-if="state == 0" @click="reject(_id)") 拒絕
                        v-btn(color="success" v-if="state == 0" @click="accept(_id)") 接受
                        v-btn(color="warning", @click="showResume(candidate)") 詳細資料

        ResumeDialog(v-model="show" :candidate="selectedCandidate")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ResumeDialog from '@/client/components/ResumeDialog.vue'
import applyment from '@/server/routes/api/applyment'
import { sendMessage } from '@/client/sysmsg'

enum State {
    Pending = 0, // 初始狀態，等待刊登者回應
    Accepted, // 刊登者接受
    Rejected, // 刊登者拒絕
    Abandoned, // 申請人放棄
    Confirmed, // 申請人確認,
    Finished // 完成
}

@Component({ components: { ResumeDialog } })
export default class extends Vue {
    @Prop()
    value!: boolean

    @Prop({default: null})
    applyment: any

    names:any = []
    candidates:any
    show = false
    selectedCandidate = null

    loading = true

    changeValue(v: boolean) {
        this.$emit('input', v)
    }

    showResume(candidate:any) {
        this.selectedCandidate = candidate
        if(this.selectedCandidate != null){
            this.show = true
        }
    }

    async reject(id:any){
        const{status} = await axios.post(`/api/applyment/${id}/reject`)
         switch (status) {
            case 200:
                sendMessage('拒絕成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async accept(id:any){
        const{status} = await axios.post(`/api/applyment/${id}/accept`)
         switch (status) {
            case 200:
                sendMessage('接受成功')
                break
            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async getNames(candidates:any){
        for(let i=0;i<candidates.length;i++){
            const { data } = await axios.get('/api/applyment/name', { params: { candidateID: candidates[i].applicant } })
            if(data.personal.nameZH == null){
                this.candidates[i].name = data.email
            }
            else{
                this.candidates[i].name = data.personal.nameZH
            }
            
            
        }
        this.loading = false
    }

   


    getColor(state: State) {
        switch (state) {
            case State.Pending:
                return 'secondary'
            case State.Accepted:
                return 'light-blue'
            case State.Rejected:
                return 'red'
            case State.Confirmed:
                return 'green'
            case State.Abandoned:
                return 'warning'
        }
    }

    getText(state: State) {
        switch (state) {
            case State.Pending:
                return '等待中'
            case State.Accepted:
                return '已接受'
            case State.Rejected:
                return '已拒絕'
            case State.Confirmed:
                return '應徵者已確認'
            case State.Abandoned:
                return '應徵者已放棄'
        }
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
