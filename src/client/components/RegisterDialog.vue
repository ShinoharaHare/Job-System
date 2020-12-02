<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(flat, tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 註冊
        v-card-text
            v-container
                v-row
                    v-col(cols="12")
                        v-text-field(label="Email")
                v-row
                    v-col(cols="6")
                        v-text-field(label="密碼")
                    v-col(cols="6")
                        v-text-field(label="確認密碼")

        v-card-actions
            v-spacer
            v-btn(color="primary", @click="") 註冊
            v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    value!: boolean

    changeValue (v: boolean) {
        this.$emit('input', v)
    }
}
</script>

<style lang="scss" scoped>
</style>
