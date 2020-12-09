<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    v-container(fluid, fill-height)
        v-row(justify="center", align="center")
            v-col
                v-img(contain, max-height="400", :src="banner")

                //- v-card-text.text-center.headline 辦個帳號吧

                v-card-text
                    v-container
                        v-row
                            v-col(cols="12")
                                v-text-field(
                                    label="Email",
                                    type="email",
                                    v-model="email"
                                )
                        v-row
                            v-col(cols="6")
                                v-text-field(
                                    label="密碼",
                                    type="password",
                                    v-model="password"
                                )
                            v-col(cols="6")
                                v-text-field(
                                    label="確認密碼",
                                    type="password",
                                    v-model="confirmPassword"
                                )

                v-card-actions
                    v-spacer
                    v-btn(
                        color="primary",
                        :loading="loading",
                        @click="registerWrapper"
                    ) 註冊
                    v-spacer
        v-row
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Acccount = namespace('Account')

@Component
export default class extends Vue {
    @Acccount.Action
    register!: Function

    banner = require('@/client/assets/logo/logo_transparent.png')

    email = ''
    password = ''
    confirmPassword = ''
    loading = false

    async registerWrapper() {
        this.loading = true
        const success = await this.register({
            email: this.email,
            password: this.password
        })
        this.loading = false
    }
}
</script>

<style lang="scss" scoped>
</style>
