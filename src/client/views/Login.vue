<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid)
        v-sheet.mx-md-auto(color="white"  elevation="12" outlined rounded max-width="450" )
            v-row(justify="center", align="center")
                v-img(contain, max-height="300", :src="banner")
            //v-row(justify="center", align="center")
                h1 USER LOGIN
            v-row(justify="center", align="center")
                v-col(sm="12" md = "9")
                    v-card-text
                        v-form(ref="form",v-model="form.valid", @submit.prevent="onSubmit")
                            v-text-field(
                                outlined,
                                color="primary",
                                label="Email",
                                type="email",
                                v-model="form.fields.email",
                                :rules="form.rules.email",
                            )
                            v-text-field(
                                outlined,
                                color="primary",
                                label="密碼",
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'",
                                :type="show ? 'text' : 'password'",
                                @click:append="() => (show  = !show)",
                                v-model="form.fields.password",
                                :rules="form.rules.password",
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
                                v-card-text
                                    v-form(ref="formForget",v-model="formForget.valid", @submit.prevent="onSubmit")
                                        v-text-field(
                                            outlined,
                                            color="primary",
                                            label="Email",
                                            type="email",
                                            v-model="formForget.fields.email",
                                            :rules="formForget.rules.email"
                                        )
                            v-card-actions()
                                v-flex(class="text-center")
                                    v-btn(
                                        color="primary",
                                        type="submit",
                                        :loading="loading",
                                        :disabled="!formForget.valid"
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
                            :disabled="!form.valid"
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

    banner = require('@/client/assets/logo/logo_transparent_cut.png')
    loading = false
    dialog = false
    show = false

    form = {
        valid: false,
        fields: {
            email: '',
            password: ''
        },
        rules: {
            email: [
                this.requireRule()
            ],
            password: [
                this.requireRule()
            ]
        }
    }

    formForget = {
        valid: false,
        fields: {
            email: ''
        },
        rules: {
            email: [
                this.requireRule()
            ]
        }
    }

    public requireRule(message = '此欄位不得為空'): (value: any) => boolean|string {
        return (value) => (!!value || value === 0) || message;
    }

    async loginWrapper() {
        this.loading = true
        const success = await this.login({
            email: this.form.fields.email,
            password: this.form.fields.password
        })
        console.log(success)
        this.loading = false
    }
}
</script>

<style lang="scss" scoped>
</style>
