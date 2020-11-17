<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(flat, tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 黑名單

        v-expansion-panels.mt-2(tile, accordion, multiple)
            v-expansion-panel(v-for="({ name }, i) in list", :key="i")
                v-expansion-panel-header {{ name }}
                v-expansion-panel-content
                    v-card-actions
                        v-spacer
                        v-btn(color="error") 移除

        v-btn(fixed, bottom, right, fab, dark, color="red", @click="")
            v-icon mdi-cancel
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    value!: boolean

    list: any[] = []

    changeValue (v: boolean) {
        this.$emit('input', v)
    }

    mounted () {
        for (let i = 0; i < 5; i++) {
            this.list.push({
                name: '文子他媽'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
