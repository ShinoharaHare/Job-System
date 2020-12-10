<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-expand-transition(mode="out-in")
        v-container(v-if="!browsing", fill-height, fluid)
            v-row(align="center", justify="center")
                v-col
                    v-img.mx-auto(conatain, max-width="400", :src="ntouLogo")

                    v-card-text.text-center.subtitle-1.font-weight-bold
                        | 連結海大校務系統 輕鬆匯入個人資料!

                    v-form(v-model="valid")
                        v-card-text
                            v-text-field(
                                required,
                                label="學號",
                                :rules="[required]",
                                v-model="ntouID"
                            )
                            v-text-field(
                                required,
                                label="密碼",
                                type="password",
                                :rules="[required]",
                                v-model="ntouPW"
                            )

                        v-card-actions
                            v-spacer
                            v-btn(
                                outlined,
                                color="success",
                                :loading="loading",
                                :disabled="!valid",
                                @click="link"
                            ) 連結
                            v-spacer
            v-row

    v-expand-transition(mode="out-in")
        div(v-if="browsing")
            v-card-text
                v-stepper.pb-0(v-model="step", vertical, alt-labels)
                    v-stepper-header
                        v-stepper-step(editable, step="1") 個人資料
                        v-divider
                        v-stepper-step(editable, step="2") 時間表

                    v-stepper-items
                        v-stepper-content(step="1")
                            v-divider.mt-2(inset)
                            v-card-actions
                                v-spacer
                                v-btn(text, color="error") 取消
                                v-btn(text, color="primary") 下一步

                        v-stepper-content.timetable-wrapper.px-0.ma-0(
                            step="2"
                        )
                            Timetable(:data="courses")
                            v-divider.mt-2(inset)
                            v-card-actions
                                v-spacer
                                v-btn(text, color="error") 上一步
                                v-btn(text, color="success") 確認匯入

    //- v-dialog(v-model="dialog.show" fullscreen hide-overlay)
    //-     TimeTable
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Timetable from '@/client/components/Timetable.vue'

@Component({ components: { Timetable } })
export default class extends Vue {
    ntouLogo = require('@/client/assets/ntou-logo.png')
    ntouID = ''
    ntouPW = ''
    loading = false
    valid = false

    browsing = false
    step = 1
    courses: any[] = []

    required = (v: string) => !!v.length || '必填'

    async link() {
        this.loading = true
        const { status, data } = await axios.post('/api/account/link-ntou', {
            ntouID: this.ntouID,
            ntouPW: this.ntouPW
        })
        this.loading = false

        if (data.success) {
            this.browsing = true
            this.courses = data.courses
        } else {

        }
    }

    mounted() {
        setTimeout(() => {
            // this.browsing = !this.browsing
        }, 1000)

        ;(window as any).aaaa = this
    }
}
</script>

<style lang="scss" scoped>
.timetable-wrapper {
    max-height: 600px;
    overflow: scroll;
}
</style>
