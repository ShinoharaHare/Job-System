<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(flat, tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 黑名單
        
        v-list
            v-list-item(v-for="({ name }, i) in list" :key="i")
                v-list-item-content
                    v-list-item-title {{ name }}
                v-list-item-action
                    v-btn(icon, @clock="")
                        v-icon mdi-close
            //- v-divider(v-if="i < list.count - 1")

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
