<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid)
        v-sheet.mx-auto(
            color="white",
            elevation="12",
            outlined,
            rounded,
            max-width="450"
        )
            //- v-row(justify="center", align="center")
            //-     v-icon(size="100", justify="center", align="center") mdi-account
            v-row(justify="center", align="center")
                v-img(contain, max-height="300", :src="logo")
            //- v-row(justify="center", align="center")
                h1 USER LOGIN
            v-row(justify="center", align="center")
                v-col(sm="12", md="9")
                    v-card-text
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
                            v-card-actions
                                v-spacer
                                v-btn(
                                    color="primary",
                                    :loading="loading",
                                    :disabled="!valid2"
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
            v-row
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Account.Action
    login!: Function

    logo = require('@/client/assets/logo/logo_transparent_cut.png')
    loading = false
    dialog = false
    show = false

    resetEmail = ''
    email = ''
    password = ''

    valid1 = false
    valid2 = false

    emailRule(v: string) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(v) || '請輸入正確的Email'
    }

    requiredRule(v: string) {
        return v.length > 0 || '必填'
    }

    async loginWrapper() {
        this.loading = true
        const success = await this.login({
            email: this.email,
            password: this.password
        })
        this.loading = false

        if (success) {
            this.$router.replace('/setting')
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
