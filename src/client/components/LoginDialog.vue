<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card(flat, tile)
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 登入
        v-card-text
            v-container
                v-row
                    v-col(cols="12")
                        v-text-field(label="Email", type="email" v-model="email")

                v-row
                    v-col(cols="12")
                        v-text-field(label="密碼", type="password"  v-model="password")

        v-card-actions
            v-spacer
            v-btn(color="primary", @click="loginWrapper" :loading="loading") 登入
            v-spacer

    v-snackbar(v-model="snackbar" :timeout="3000") {{ message }}
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
    snackbar = false
    message = ''

    async loginWrapper () {
        this.loading = true
        const success = await this.login({
            email: this.email,
            password: this.password
        })
        this.message = success ? '登入成功' : '登入失敗'
        this.snackbar = true
        this.loading = false
    }

    changeValue (v: boolean) {
        this.$emit('input', v)
    }
}
</script>

<style lang="scss" scoped>
</style>
