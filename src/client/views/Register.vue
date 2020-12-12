<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid, fill-height)
        v-row(justify="center", align="center")
            v-col
                v-img(contain, max-height="350", :src="logo")

                v-card-text
                    v-container
                        v-form(ref="form", v-model="valid")
                            v-row
                                v-col(cols="12")
                                    v-text-field(
                                        label="E-mail",
                                        type="email",
                                        prepend-icon="mdi-email",
                                        :rules="[requiredRule, emailRule]",
                                        v-model="email"
                                    )
                            v-row
                                v-col(cols="6")
                                    v-text-field(
                                        label="密碼",
                                        type="password",
                                        prepend-icon="mdi-lock",
                                        :rules="[requiredRule, passwordRule]",
                                        v-model="password"
                                    )
                                v-col(cols="6")
                                    v-text-field(
                                        label="確認密碼",
                                        type="password",
                                        prepend-icon="mdi-lock-check",
                                        :rules="[requiredRule, confirmRule]",
                                        v-model="confirmPassword"
                                    )

                v-card-actions
                    v-spacer
                    v-btn.mx-6(
                        outlined,
                        width="70%",
                        color="primary",
                        :loading="loading",
                        :disabled="!valid",
                        @click="registerWrapper"
                    ) 註冊
                    v-spacer
        v-row
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Acccount = namespace('Account')

@Component
export default class extends Vue {
    @Acccount.Action
    register!: Function

    logo = require('@/client/assets/logo/logo_transparent.png')

    email = ''
    password = ''
    confirmPassword = ''
    loading = false
    valid = false

    requiredRule(v: string) {
        return v.length > 0 || '必填'
    }

    emailRule(v: string) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(v) || '請輸入正確的Email'
    }

    passwordRule(v: string) {
        return /[A-Za-z\d]{8,}$/.test(v) || '只能包含英數字且至少8位'
    }

    confirmRule(v: string) {
        return v === this.password || '兩次輸入不相同'
    }

    async registerWrapper() {
        this.loading = true
        const success = await this.register({
            email: this.email,
            password: this.password
        })
        this.loading = false

        if (success) {
            this.$router.replace('/login')
        }
    }
}
</script>
