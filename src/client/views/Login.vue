<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid)
        v-sheet.mx-auto(color="white" width = "600" elevation="12" outlined rounded)
            v-row(justify="center", align="center")
                v-icon(size = "100" justify="center" align="center") mdi-account
            v-row(justify="center", align="center")
                h1 USER LOGIN
            v-row(justify="center", align="center")
                v-col(sm="12" md = "9")
                    v-card-text
                        v-text-field(
                            outlined,
                            label="Email",
                            type="email",
                            v-model="email"
                        )
                        v-text-field(
                            outlined,
                            label="密碼",
                            type="password",
                            v-model="password",
                        )
                    a(href="http://www.wibibi.com" style="text-decoration:none;") 忘記密碼?
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
    password = ''
    loading = false

    async loginWrapper() {
        this.loading = true
        const success = await this.login({
            email: this.email,
            password: this.password
        })
        this.loading = false
    }
}
</script>

<style lang="scss" scoped>
</style>
