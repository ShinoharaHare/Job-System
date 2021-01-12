<template lang="pug">
v-card.link-ntou(tile, height="100vh")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-expand-transition(mode="out-in")
        v-container(fluid, style="margin-top: 10vh", v-if="!browsing")
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
                                width="70%",
                                color="success",
                                :loading="loading",
                                :disabled="!valid",
                                @click="link"
                            ) 連結
                            v-spacer

    v-expand-transition(mode="out-in")
        v-card(flat, v-show="browsing")
            v-card-text
                v-stepper.pb-0(v-model="step", alt-labels)
                    v-stepper-header
                        v-stepper-step(editable, step="1") 個人資料
                        v-divider
                        v-stepper-step(editable, step="2") 時間表

                    v-stepper-items
                        v-stepper-content.pa-0.ma-0(step="1")
                            v-card-actions
                                v-spacer
                                v-btn(
                                    outlined,
                                    color="error",
                                    @click="browsing = false"
                                ) 取消
                                v-btn(
                                    outlined,
                                    color="primary",
                                    @click="step++"
                                ) 下一步
                            v-divider
                            .content-wrapper
                                PersonalInfo(ref="personalInfo")

                        v-stepper-content.pa-0.ma-0(step="2")
                            v-card-actions
                                v-spacer
                                v-btn(outlined, color="error", @click="step--") 上一步
                                v-btn(
                                    outlined,
                                    color="primary",
                                    :loading="importing",
                                    @click="importData"
                                ) 匯入
                            v-divider
                            .content-wrapper
                                Timetable(ref="timetable")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Timetable from '@/client/components/Timetable.vue'
import PersonalInfo from '@/client/components/PersonalInfo.vue'
import { sendMessage } from '../sysmsg'

@Component({ components: { Timetable, PersonalInfo } })
export default class extends Vue {
    ntouLogo = require('@/client/assets/ntou-logo.png')
    ntouID = ''
    ntouPW = ''
    loading = false
    valid = false

    browsing = false
    step = 1
    importing = false

    timetable!: any
    personalInfo!: any

    required = (v: string) => !!v.length || '必填'

    async link() {
        this.loading = true
        const { status, data } = await axios.post('/api/account/link-ntou', {
            ntouID: this.ntouID,
            ntouPW: this.ntouPW
        })
        this.loading = false

        switch (status) {
            case 200:
                if (data.success) {
                    this.browsing = true
                    this.timetable.setData(data.courses)
                    this.personalInfo.setData(data.personal)
                } else {
                    sendMessage('無法登入海洋大學校務系統，請確認輸入的資料正確', {
                        color: 'error',
                        timeout: 3000
                    })
                }
                break

            case 401:
                sendMessage('尚未登入', { color: 'error' })
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async importData() {
        this.importing = true
        const { status } = await axios.patch('/api/account', {
            data: {
                personal: this.personalInfo.getData(),
                events: this.timetable.getData()
            }
        })
        this.importing = false

        switch (status) {
            case 200:
                this.$router.back()
                sendMessage('成功匯入資料')
                break

            case 401:
                sendMessage('尚未登入', { color: 'error' })
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    mounted() {
        this.personalInfo = this.$refs.personalInfo
        this.timetable = this.$refs.timetable
    }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
    max-height: calc(100vh - 250px);
    overflow: scroll;
}
</style>

<style lang="scss">
.link-ntou {
    .v-stepper__label {
        display: inline !important;
    }
}
</style>
