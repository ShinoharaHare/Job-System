<template lang="pug">
v-dialog(fullscreen :value="value")
    v-card(flat, tile)
        v-toolbar(dark color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 登入
        v-card-text
            v-container
                v-row
                    v-col(cols="12")
                        v-text-field(label="Email")

                v-row
                    v-col(cols="12")
                        v-text-field(label="密碼")

        v-card-actions
            v-spacer
            v-btn(color="primary", @click="") 登入
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
