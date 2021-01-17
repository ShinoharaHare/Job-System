<template lang="pug">
v-dialog(persistent, width="290px", v-model="dialog")
    template(v-slot:activator="{ on, attrs }")
        v-text-field(
            outlined,
            dense,
            readonly,
            :prepend-icon="prependIcon",
            :label="label",
            :value="value",
            :rules="rules",
            v-bind="attrs",
            v-on="on"
        )

    v-time-picker(
        year-icon="mdi-calendar-blank",
        prev-icon="mdi-skip-previous",
        next-icon="mdi-skip-next",
        v-model="time",
        v-if="dialog"
    )
        v-spacer
        v-btn(text, color="error", @click="dialog = false") 取消
        v-btn(text, color="primary", @click="save") 確認
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop({ default: '' })
    value!: string
    @Prop({ default: '' })
    label!: string
    @Prop({ default: '' })
    prependIcon!: string
    @Prop()
    rules!: ((v: string) => boolean | string)[]

    time = null
    dialog = false

    save() {
        this.dialog = false
        this.$emit('input', this.time)
    }
}
</script>