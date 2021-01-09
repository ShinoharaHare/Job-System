<template lang="pug">
v-dialog(
    persistent,
    width="290px",
    ref="dialog",
    :return-value.sync="value",
    v-model="dialog"
)
    template(v-slot:activator="{ on, attrs }")
        v-text-field(
            outlined,
            dense,
            readonly,
            :prepend-icon="prependIcon",
            :label="label",
            :value="value",
            v-bind="attrs",
            v-on="on"
        )

    v-time-picker(
        year-icon="mdi-calendar-blank",
        prev-icon="mdi-skip-previous",
        next-icon="mdi-skip-next",
        :value="value",
        @input="$emit('input', $event)"
    )
        v-spacer
        v-btn(text, color="primary", @click="dialog = false") 取消
        v-btn(text, color="primary", @click="$refs.dialog.save(value)") 確認
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop({ default: '' })
    value!: string
    @Prop({ default: '' })
    label!: string
    @Prop({ default: ''})
    prependIcon!: string

    dialog = false
}
</script>