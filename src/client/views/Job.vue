<template lang="pug">
v-card.wrapper(tile, height="100%")
    v-toolbar(dark)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

        | {{ job.title }}
        v-spacer

    v-card.pa-4(flat)
        v-container(fluid)
            v-row
                v-col
                    v-card(flat)
                        v-card-title 工作內容
                        RichTextEditor(
                            hideToolbar,
                            hideStatus,
                            readOnly,
                            height="calc(100vh - 550px)"
                            ref="editor"
                        )

            v-row
                v-col 
                    v-combobox(
                        readonly,
                        outlined,
                        multiple,
                        small-chips,
                        label="標籤",
                        :search-input.sync="search",
                        :value="job.tags"
                    )
                    template(#no-data)
                        v-list-item
                            v-list-item-content
                                v-list-item-title

            v-row
                v-col
                    v-card(outlined)
                        v-card-title 工作時間
                        v-data-table(
                            disable-sort,
                            disable-pagination,
                            hide-default-footer,
                            :mobile-breakpoint="0",
                            :headers="headers",
                            :items="job.times"
                        )

    v-footer(fixed, padless)
        v-card(tile, width="100%")
            v-card-actions
                v-btn(icon, large)
                    v-icon mdi-heart-outline
                v-btn.mx-auto(
                    outlined,
                    color="primary",
                    width="70%",
                    @click="apply"
                ) 我要應徵
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import RichTextEditor from '@/client/components/RichTextEditor.vue'
import { IJob } from '@/server/models'
import { sendMessage } from '../sysmsg'

@Component({ components: { RichTextEditor } })
export default class extends Vue {
    @Ref() editor!: RichTextEditor

    job: any = {
        title: '',
        content: '',
        tags: [],
        time: []
    }

    headers = [
        { text: '星期(幾)', value: 'weekday', align: 'center' },
        { text: '開始時間', value: 'start', align: 'center' },
        { text: '結束時間', value: 'end', align: 'center' },
    ]

    async apply() {
        let { status } = await axios.post('/api/applyment', {
            job: this.$route.params.id,
            resume: '履歷...'
        })

        switch (status) {
            case 201:
                // this.$router.push('')
                sendMessage('應徵成功')
                break

            default:

        }
    }

    async mounted() {
        const id = this.$route.params.id
        const { status, data } = await axios.get(`/api/job/${id}`)

        switch (status) {
            case 200:
                this.job = data
                this.editor.setContent('# heeeee')
                this.editor.refresh()
                break
            case 404:
                // 導向到404頁面
                // this.$router.push('/404')
                break
        }
    }
}
</script>

<style lang="scss" scoped>
.v-list-item__subtitle {
    margin-top: 4px;
    padding-left: 16px;
}

.wrapper {
    padding-bottom: 60px;
}
</style>
