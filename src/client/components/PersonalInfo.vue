<template lang="pug">
v-card(flat, tile)
    v-container(fluid)
        v-row.px-4
            v-label 姓名

        v-row
            v-col
                v-text-field(
                    outlined,
                    dense,
                    label="中文",
                    v-model="data.nameZH"
                )
            v-col
                v-text-field(
                    outlined,
                    dense,
                    label="英文",
                    v-model="data.nameEN"
                )

        v-row.px-4
            v-label 性別

        v-radio-group(v-model="data.gender")
            v-row
                v-col
                    v-radio(label="男", value="男")
                v-col
                    v-radio(label="女", value="女")

        v-row.px-4
            v-label 身分識別碼

        v-row
            v-col
                v-text-field(
                    outlined,
                    dense,
                    label="國籍",
                    v-model="data.nationality"
                )

        v-row
            v-col
                v-text-field(
                    outlined,
                    dense,
                    label="身分證字號",
                    v-model="data.identity"
                )
                v-text-field(
                    outlined,
                    dense,
                    label="護照號碼",
                    v-model="data.passport"
                )
                v-text-field(
                    outlined,
                    dense,
                    label="居留證號碼",
                    v-model="data.residentCert"
                )

        v-row
            v-col
                v-dialog(
                    persistent,
                    width="290px",
                    ref="dialog",
                    :return-value.sync="data.birthday",
                    v-model="dialog"
                )
                    template(v-slot:activator="{ on, attrs }")
                        v-text-field(
                            readonly,
                            label="生日",
                            prepend-icon="mdi-cake-variant",
                            v-bind="attrs",
                            v-on="on",
                            v-model="data.birthday"
                        )
                    v-date-picker(
                        year-icon="mdi-calendar-blank",
                        prev-icon="mdi-skip-previous",
                        next-icon="mdi-skip-next",
                        v-model="data.birthday"
                    )
                        v-spacer
                        v-btn(text, color="primary", @click="dialog = false") 取消
                        v-btn(
                            text,
                            color="primary",
                            @click="$refs.dialog.save(date)"
                        ) 確認

            v-col
                v-text-field(
                    label="血型",
                    prepend-icon="mdi-water",
                    v-model="data.bloodType"
                )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    data: any = {}

    dialog = false

    setData(data: any) {
        this.data = data
    }

    getData() {
        return this.data
    }

    mounted() {

    }
}
</script>
