<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid)
        v-row(dense)
            v-col(cols="12")
                v-card.mx-auto(
                    color="white",
                    outlined,
                    rounded,
                    max-width="400"
                )
                    //- v-row(justify="center", align="center")
                    //-     v-icon(size="100", justify="center", align="center") mdi-account
                    v-row(justify="center", align="center")
                        v-img(contain, max-height="200", :src="logo")
                    //- v-row(justify="center", align="center")
                        h1 USER LOGIN
                    v-row(justify="center", align="center")
                        v-col(sm="12", md="9")
                            v-card-text.pb-0
                                v-form(v-model="valid1")
                                    v-text-field(
                                        :rules="[requiredRule, emailRule]",
                                        outlined,
                                        color="primary",
                                        label="E-mail",
                                        type="email",
                                        v-model="email",
                                        required
                                    )
                                    v-text-field(
                                        outlined,
                                        color="primary",
                                        label="密碼",
                                        :rules="[requiredRule]",
                                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'",
                                        :type="show ? 'text' : 'password'",
                                        @click:append="() => (show = !show)",
                                        v-model="password"
                                    )

                            //- 忘記密碼

                            v-dialog(
                                v-model="dialog",
                                max-width="450",
                                max-height="700"
                            )
                                template(v-slot:activator="{ on, attrs }")
                                    v-btn(
                                        color="primary",
                                        text,
                                        v-bind="attrs",
                                        v-on="on"
                                    ) 忘記密碼
                                v-card
                                    v-card-title.justify-center
                                        v-icon(
                                            size="50",
                                            justify="center",
                                            align="center"
                                        ) mdi-lock-outline
                                        h4 忘記密碼?

                                    v-card-text.text-subtitle-2.text-center.black--text
                                        | 請輸入你的信箱，並到信箱開啟驗證信根據步驟重設密碼

                                    v-card-text
                                        v-form(v-model="valid2")
                                            v-text-field(
                                                outlined,
                                                color="primary",
                                                label="E-mail",
                                                type="email",
                                                :rules="[requiredRule, emailRule]",
                                                v-model="resetEmail"
                                            )
                                    v-dialog(
                                        v-model="dialog2",
                                        persistent,
                                        max-width="450",
                                        max-height="700"
                                    )
                                        v-card
                                            v-card-title.justify-center
                                                v-icon(
                                                    size="50",
                                                    justify="center",
                                                    align="center"
                                                ) mdi-email-outline
                                                h4 輸入驗證碼

                                            v-card-text.text-subtitle-2.text-center.black--text
                                                | 我們已將驗證碼發送到您的信箱
                                            v-card-text
                                                v-form(v-model="valid3")
                                                    v-text-field(
                                                        outlined,
                                                        color="primary",
                                                        label="驗證碼",
                                                        :rules="[requiredRule]",
                                                        v-model="validCode"
                                                    )
                                            v-card-actions
                                                v-spacer
                                                v-btn(
                                                    color="primary",
                                                    :loading="loading",
                                                    :disabled="!valid3"
                                                    @click="resetPwd()"
                                                ) 驗證
                                                v-spacer
                                    v-card-actions
                                        v-spacer
                                        v-btn(
                                            color="primary",
                                            :loading="loading",
                                            :disabled="!valid2"
                                            @click="sentVerCode"
                                        ) 發送驗證碼
                                        v-spacer
                            v-card-actions
                                v-spacer
                                v-btn(
                                    block,
                                    x-large,
                                    color="primary",
                                    @click="loginWrapper",
                                    type="submit",
                                    :loading="loading",
                                    :disabled="!valid1"
                                ) 登入
                                v-spacer
            v-col(cols="12")
                v-spacer
                v-card.mx-auto(
                    color="white",
                    outlined,
                    rounded,
                    max-width="400"
                )
                    .my-2.d-flex.flex-row
                        v-spacer
                        p.py-1.mb-0 還沒有帳號嗎?
                        router-link.pt-1(to="/register")
                            | 
                            | 註冊
                        v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { sendMessage } from '@/client/sysmsg'
import sha256 from 'crypto-js/sha256'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Account.Action
    login!: Function

    logo = require('@/client/assets/logo/logo_transparent_cut.png')
    loading = false
    dialog = false
    dialog2 = false
    show = false

    resetEmail = ''
    email = ''
    password = ''
    validCode = ''

    valid1 = false
    valid2 = false
    valid3 = false
    validState = 0

    emailRule(v: string) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(v) || '請輸入正確的Email'
    }

    requiredRule(v: string) {
        return v.length > 0 || '必填'
    }
    async sentVerCode() {
        this.dialog2 = !this.dialog2
        const email = this.email
        this.loading = true
        const {status, data } = await axios.post('/api/account/sentVerCode', { email })
        this.loading = false


    }

    async resetPwd() {
        const hash = sha256(this.password).toString()
        const email = this.email
        
        this.loading = true
        const { status, data } = await axios.post('/api/account/resetPwd', { email, hash })
        this.loading = false

        switch (this.validState) {
        case 1:
            this.$router.replace('/resetpassword')
            sendMessage('驗證成功')
            break
        case 2:
            sendMessage('驗證碼錯誤', { color: 'error' })
            break
        case 3:
            sendMessage('驗證碼已過期', { color: 'error' })
            break
        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    async loginWrapper() {
        this.loading = true
        const status = await this.login({
            email: this.email,
            password: this.password
        })
        this.loading = false

        switch (status) {
        case 200:
            this.$router.replace('/setting')
            sendMessage('登入成功')
            break

        case 401:
            sendMessage('登入失敗', { color: 'error' })
            break

        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    }
}
</script>

<style lang="scss" scoped>
    a {  text-decoration: none;}
    .center {
        text-align: center;
    }
</style>
