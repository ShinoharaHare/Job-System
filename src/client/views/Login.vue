<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid)
        v-sheet.mx-md-auto(color="white"  elevation="12" outlined rounded)
            v-row(justify="center", align="center")
                v-icon(size = "100" justify="center" align="center") mdi-account
            v-row(justify="center", align="center")
                h1 USER LOGIN
            v-row(justify="center", align="center")
                v-col(sm="12" md = "9")
                    v-card-text
                        form
                            v-text-field(
                                outlined,
                                color="primary",
                                label="Email",
                                type="email",
                                v-model="email",
                            )
                            v-text-field(
                                outlined,
                                color="primary",
                                label="密碼",
                                type="password",
                                v-model="password",
                            )
                    v-dialog(v-model="dialog" width="300" height="700")
                        template(v-slot:activator="{ on, attrs }")
                            v-btn(color="primary" text v-bind="attrs" v-on="on") 忘記密碼
                        v-card
                            v-card-title(class="justify-center")
                                v-icon(size = "50" justify="center" align="center") mdi-lock-outline
                                h 忘記密碼?

                            v-card-text 請輸入你的信箱，並到信箱根據步驟重設密碼
                                v-text-field(
                                    outlined,
                                    color="primary",
                                    label="Email",
                                    type="email",
                                    v-model="resetEmail",
                                )

                    v-card-actions
                        v-spacer
                        v-btn(
                            block,
                            x-large,
                            color="primary",
                            @click="loginWrapper",
                            :loading="loading"
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
    @Prop()
    value!: boolean

    @Account.Action
    login!: Function

    email = ''
    resetEmail = ''
    password = ''
    loading = false
    dialog = false

    async loginWrapper() {
        if (this.email.length === 0) {

        } else if (this.password.length === 0) {

        } else {
            this.loading = true
            const success = await this.login({
                email: this.email,
                password: this.password
            })
            console.log(success)
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
