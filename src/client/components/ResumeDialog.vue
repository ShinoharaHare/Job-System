<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 履歷

        //-v-card-text {{ content }}
        
        RichTextEditor(
            hideToolbar,
            hideStatus,
            readOnly,
            height="calc(150vh - 550px)",
            ref="textContent",
        )

        v-footer(absolute, padless)
            v-card(tile, width="100%")
                v-card-actions
                    v-spacer
                    v-btn(color="error", width="100" v-if="candidate.state == 0" @click="reject(candidate.id)") 拒絕
                    v-spacer
                    v-btn(color="success", width="100" v-if="candidate.state == 0" @click="accept(candidate.id)") 接受
                    v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import RichTextEditor from '@/client/components/RichTextEditor.vue'
import { sendMessage } from '@/client/sysmsg'

@Component({ components: { RichTextEditor} })
export default class extends Vue {
    @Prop()
    value!: boolean

    @Prop({default: null})
    candidate!:any


    @Ref('textContent') textContent!:RichTextEditor

    //content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'

    changeValue (v: boolean) {
        this.$emit('input', v)
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

    @Watch('candidate',{immediate:true})
    contentChanged(oldValue: any, newValue: any){
        if(this.candidate != null){
            console.log(this.candidate)
            setTimeout(() => {
                this.textContent.setContent(this.candidate.resume)
                this.textContent.refresh()
            }, 300)
        }
    }

    mounted () {

    }
}
</script>

<style lang="scss" scoped>
</style>
