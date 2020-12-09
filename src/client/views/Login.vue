<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid, fill-height)
        v-row(justify="center", align="center")
            v-col
                v-card-text
                    v-text-field(label="Email", type="email", v-model="email")
                    v-text-field(
                        label="密碼",
                        type="password",
                        v-model="password"
                    )

                v-card-actions
                    v-spacer
                    v-btn(
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
