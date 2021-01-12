<template lang="pug">
v-card(flat)
    v-card-text
        v-container(fluid)
            v-row
                v-col
                    v-text-field(label="標題", v-model="title")
            v-row
                v-col
                    v-card(outlined)
                        v-data-table(
                            disable-sort,
                            disable-pagination,
                            hide-default-footer,
                            :mobile-breakpoint="0",
                            :headers="timeHeaders",
                            :items="times"
                        )
                            template(#header.action)
                                v-btn(
                                    outlined,
                                    color="primary",
                                    @click="addTimeDialog.show = true"
                                ) 新增
                                    v-icon mdi-plus

                                v-dialog(
                                    persistent,
                                    max-width="300",
                                    v-model="addTimeDialog.show"
                                )
                                    v-card
                                        v-card-title 新增時間

                                        v-card-text
                                            v-select(
                                                dense,
                                                outlined,
                                                label="星期(幾)",
                                                :items="addTimeDialog.weekdays",
                                                v-model="addTimeDialog.weekday"
                                            )
                                            TimePicker(
                                                label="開始時間",
                                                prepend-icon="mdi-clock-start",
                                                v-model="addTimeDialog.start"
                                            )

                                            TimePicker(
                                                label="結束時間",
                                                prepend-icon="mdi-clock-end",
                                                v-model="addTimeDialog.end"
                                            )

                                        v-card-actions
                                            v-spacer
                                            v-btn(
                                                outlined,
                                                color="red",
                                                @click="addTimeDialog.show = false"
                                            ) 取消
                                            v-btn(
                                                outlined,
                                                color="blue darken-1",
                                                @click="addTime"
                                            ) 新增
                                            v-spacer

                            template.text-center(#item.action="{ item }")
                                v-icon(color="red", @click="removeItem(item)") mdi-trash-can
                                //- v-icon.ml-2(color="blue darken-1", @click="") mdi-pencil

            v-row
                v-col
                    TagPicker(ref="tagPicker" label="搜尋標籤")

        RichTextEditor(height="calc(100vh - 600px)" ref="textContent")
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

import RichTextEditor from '@/client/components/RichTextEditor.vue'
import TimePicker from '@/client/components/TimePicker.vue'
import TagPicker from '@/client/components/TagPicker.vue'


@Component({ components: { RichTextEditor, TimePicker, TagPicker } })
export default class extends Vue {
    @Ref() tagPicker!: TagPicker
    @Ref('textContent') textContent!: RichTextEditor
    timeHeaders = [
        { text: '星期(幾)', value: 'weekday', align: 'center' },
        { text: '開始時間', value: 'start', align: 'center' },
        { text: '結束時間', value: 'end', align: 'center' },
        { value: 'action', align: 'center' }
    ]

    title = ''
    times: any[] = []

    addTimeDialog = {
        show: false,
        weekdays: [
            { text: '星期一', value: 1 },
            { text: '星期二', value: 2 },
            { text: '星期三', value: 3 },
            { text: '星期四', value: 4 },
            { text: '星期五', value: 5 },
            { text: '星期六', value: 6 },
            { text: '星期日', value: 7 },
        ],
        weekday: null,
        start: null,
        end: null,

        clear() {
            this.weekday = null
            this.start = null
            this.end = null
        },

        getItem() {
            return {
                weekday: this.weekday,
                start: this.start,
                end: this.end
            }
        }
    }

    addTime() {
        this.times.push(this.addTimeDialog.getItem())
        this.addTimeDialog.clear()
        this.addTimeDialog.show = false

        console.log(this.times)
    }

    removeItem(item: any) {
        let i = this.times.indexOf(item)
        this.times.splice(i, 1)
    }

    getData() {
        return {
            title: this.title,
            times: this.times,
            ...this.tagPicker.getData()
        }
    }

    mounted() {
        const newContent = `### 公司名稱
和蚊子便利商店

### 工作內容
* #### 打包作業
* #### 接待客人
* #### 整理清潔環境
* #### 外送服務
<br> 

### 待遇
時薪 $160 

### 需求人數
1人

### 工作地點
基隆市中正區北寧路2號`
        this.textContent.setContent(newContent)
    }
}
</script>
