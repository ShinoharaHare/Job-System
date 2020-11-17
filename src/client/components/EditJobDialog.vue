<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(tile)
        v-toolbar(dark, color="primary")
            v-toolbar-title 編輯工作

        v-card-text
            v-textarea(
                auto-grow,
                height="400",
                background-color="grey lighten-4",
                v-model="content"
            )
            v-combobox(label="新增標籤")
            v-row
                v-col(cols="11", sm="5")
                    v-menu(
                        ref="menu",
                        v-model="menu2",
                        :close-on-content-click="false",
                        :nudge-right="40",
                        :return-value.sync="time",
                        transition="scale-transition",
                        offset-y="",
                        max-width="290px",
                        min-width="290px"
                    )
                        template(v-slot:activator="{ on, attrs }")
                            v-text-field(
                                v-model="time",
                                label="選擇時間",
                                prepend-icon="mdi-clock",
                                readonly,
                                v-bind="attrs",
                                v-on="on"
                            )
                        v-time-picker(
                            v-if="menu2",
                            v-model="time",
                            full-width="",
                            @click:minute="$refs.menu.save(time)"
                        )

        v-footer(absolute, padless)
            v-card(tile, width="100%")
                v-card-actions
                    v-text-field.mx-4
                    v-btn(color="error" @click="changeValue(false)") 取消
                    v-btn(color="success") 確認
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    value!: boolean

    content = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'

    time = null
    menu2 = null

    changeValue (v: boolean) {
        this.$emit('input', v)
    }

    mounted () {

    }
}
</script>

<style lang="scss" scoped>
</style>
