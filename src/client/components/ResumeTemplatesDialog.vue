<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(flat, tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 履歷範本

        v-expansion-panels.mt-2(tile, accordion, multiple)
            v-expansion-panel(v-for="({ name }, i) in list", :key="i")
                v-expansion-panel-header {{ name }}
                v-expansion-panel-content
                    v-card-actions
                        v-spacer
                        v-btn(color="error") 移除
                        v-btn(color="success") 修改

        v-btn(
            fixed,
            bottom,
            right,
            fab,
            dark,
            color="primary",
            @click="showEditor = true"
        )
            v-icon mdi-plus

        EditResumeDialog(v-model="showEditor" )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import EditResumeDialog from '@/client/components/EditResumeDialog.vue'

@Component({ components: { EditResumeDialog } })
export default class extends Vue {
    @Prop()
    value!: boolean

    list: any[] = []
    showEditor = false

    changeValue (v: boolean) {
        this.$emit('input', v)
    }

    mounted () {
        for (let i = 0; i < 5; i++) {
            this.list.push({
                name: '我的履歷'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
