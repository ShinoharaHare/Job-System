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
            v-row(justify="center", align="center")
                h1 重設密碼
            v-row(justify="center", align="center")
                v-col(sm="12", md="9")
                    v-card-text
                        v-form(v-model="valid")
                            v-text-field(
                                outlined,
                                color="primary",
                                label="新密碼",
                                :rules="[requiredRule,passwordRule]",
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'",
                                :type="show1 ? 'text' : 'password'",
                                @click:append="() => (show1 = !show1)",
                                v-model="newPwd"
                            )
                            v-text-field(
                                outlined,
                                color="primary",
                                label="確認新密碼",
                                :rules="[requiredRule,confirmRule]",
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'",
                                :type="show2 ? 'text' : 'password'",
                                @click:append="() => (show2 = !show2)",
                                v-model="confirmNewPwd"
                            )
                    v-card-actions
                        v-spacer
                        v-btn(
                            block,
                            x-large,
                            color="primary",
                            type="submit",
                            :disabled="!valid"
                            @click="resetPwd()"
                        ) 重設
                        v-spacer
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import sha256 from 'crypto-js/sha256'
import { sendMessage } from '@/client/sysmsg'

const Account = namespace('Account')

@Component
export default class extends Vue {
    newPwd = ''
    confirmNewPwd = ''
    show1 = false
    show2 = false
    valid = false
    loading = false

    async resetPwd() {
        const newHash = sha256(this.newPwd).toString()
        const email = this.$route.params.email
        console.log("reserEmail = " + email)
        
        this.loading = true
        const { status, data } = await axios.post('/api/account/resetPwd', { email, newHash })
        this.loading = false

        switch (status) {
        case 200:
            this.$router.replace('/login')
            sendMessage('更改成功，請重新登入。')
            break
        default:
            sendMessage('未知的錯誤', { color: 'error' })
        }
    }

    requiredRule(v: string) {
        return v.length > 0 || '必填'
    }

    passwordRule(v: string) {
        return /[A-Za-z\d]{8,}$/.test(v) || '只能包含英數字且至少8位'
    }

    confirmRule(v: string) {
        return v === this.newPwd || '兩次輸入不相同'
    }
}
</script>

<style lang="scss" scoped>
</style>
