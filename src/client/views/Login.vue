<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid)
        v-sheet.mx-md-auto(color="white"  elevation="12" outlined rounded max-width="450")
            v-row(justify="center", align="center")
                v-icon(size = "100" justify="center" align="center") mdi-account
            v-row(justify="center", align="center")
                h1 USER LOGIN
            v-row(justify="center", align="center")
                v-col(sm="12" md = "9")
                    v-card-text
                        v-form(ref="entryForm",@submit.prevent="submitHandler")
                            v-text-field(
                                :rules="numberRules",
                                outlined,
                                color="primary",
                                label="Email",
                                type="email",
                                v-model="email",
                                required,
                            )
                            v-text-field(
                                outlined,
                                color="primary",
                                label="密碼",
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'",
                                :type="show ? 'text' : 'password'",
                                @click:append="() => (show  = !show)",
                                v-model="password",
                            )
                    //忘記密碼
                    v-dialog(v-model="dialog" max-width="450" max-height="700")
                        template(v-slot:activator="{ on, attrs }")
                            v-btn(color="primary" text v-bind="attrs" v-on="on") 忘記密碼
                        v-card
                            v-card-title(class="justify-center")
                                v-icon(size = "50" justify="center" align="center") mdi-lock-outline
                                h 忘記密碼?

                            v-row.mx-6(align="center")
                                p 請輸入你的信箱，並到信箱開啟驗證信根據步驟重設密碼
                                v-text-field(
                                    outlined,
                                    color="primary",
                                    label="Email",
                                    type="email",
                                    v-model="resetEmail",
                                )
                            v-card-actions()
                                v-flex(class="text-center")
                                    v-btn(
                                        color="primary",
                                        :loading="loading"
                                    ) 發送驗證碼

                    v-card-actions
                        v-spacer
                        v-btn(
                            block,
                            x-large,
                            color="primary",
                            @click="loginWrapper",
                            type="submit",
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
    @Account.Action
    login!: Function

    email = ''
    resetEmail = ''
    password = ''
    loading = false
    dialog = false
    show = false
    numberRules = ''

    public submitHandler(): void {

    }

    async loginWrapper() {
        if (this.email.length === 0) {

        } else if (this.password.length === 0) {

        } else {
            this.loading = true
            const success = await this.login({
                email: this.email,
                password: this.password
            })
            this.loading = false

            // if(this.value){
            //     this.$router.push('Personal')
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
