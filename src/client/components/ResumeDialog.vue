<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 履歷

        v-card-text {{ content }}

        v-footer(absolute, padless)
            v-card(tile, width="100%")
                v-card-actions
                    v-spacer
                    v-btn(color="error", width="100") 拒絕
                    v-spacer
                    v-btn(color="success", width="100") 接受
                    v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    value!: boolean

    content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'

    changeValue (v: boolean) {
        this.$emit('input', v)
    }

    mounted () {

    }
}
</script>

<style lang="scss" scoped>
</style>
