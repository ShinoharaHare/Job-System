<template lang="pug">
v-card(flat)
    v-card-text
        v-container(fluid)
            v-row
                v-col
                    v-text-field(solo, dense, label="標題")
            v-row
                v-col
                    v-data-table(
                        disable-sort,
                        disable-pagination,
                        hide-default-footer,
                        :mobile-breakpoint="0",
                        :headers="timeHeaders",
                        :items="timeItems"
                    )
                        template(#header.action)
                            v-icon(@click="addTimeDialog.show = true") mdi-plus

                            v-dialog(
                                v-model="addTimeDialog.show",
                                max-width="300"
                            )
                                v-card
                                    v-card-text
                                        v-text-field(dense, readonly, outlined)
                                        v-text-field(dense, readonly, outlined)

                        template(#item.action)
                            v-icon.mr-2(@click="") mdi-trash-can
                            v-icon(@click="") mdi-pencil
        QuillEditor(ref="QuillEditor")
        v-card(tile, width="100%")
            v-card-actions
                v-spacer
                v-btn(color="error" @click="") 取消
                v-spacer
                v-btn(color="success" @click="submit()") 確認
                v-spacer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import QuillEditor from '@/client/components/QuillEditor.vue'

@Component({ components: { QuillEditor } })
export default class extends Vue {
    timeHeaders = [
        { text: '星期', value: 'weekday' },
        { text: '開始時間', value: 'start' },
        { text: '結束時間', value: 'end' },
        { text: null, value: 'action' }
    ]

    timeItems = [
        {
            weekday: 1
        }
    ]

    addTimeDialog = {
        show: false
    }

    mounted() {
        // (window as any).test = this.$refs.QuillEditor;
        ; (this.$refs.QuillEditor as any).loadDefault();
    }

    submit(){
        
    }
}
</script>
