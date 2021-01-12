<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 設定

    v-list(v-if="isLogin", two-line)
        v-list-item(to="/personal")
            v-list-item-avatar
                v-icon(large) mdi-account-outline

            v-list-item-content
                v-list-item-title.headline {{ name }}
                v-list-item-subtitle 編輯資料
                    v-icon mdi-chevron-right

    v-divider

    v-list(v-if="isJobSeeker", subheader)
        v-list-item(to="/link-ntou")
            v-list-item-icon
                v-icon mdi-link-variant
            v-list-item-content
                v-list-item-title 連結海大校務系統

        v-list-item(to="/timetable")
            v-list-item-icon
                v-icon mdi-timetable
            v-list-item-content
                v-list-item-title 課表

    v-divider

    v-list(v-if="isLogin", subheader)
        //- v-subheader(inset) 控制

        v-list-item(@click="switchUserState")
            v-list-item-icon
                v-icon mdi-swap-horizontal
            v-list-item-content
                v-list-item-title 切換模式

        v-list-item(to="/resume", v-if="isJobSeeker")
            v-list-item-icon
                v-icon mdi-text-box-outline
            v-list-item-content
                v-list-item-title 履歷範本
            v-list-item-icon
                v-icon mdi-chevron-right

        v-list-item(@click="showBlacklist = true")
            v-list-item-icon
                v-icon mdi-account-cancel-outline
            v-list-item-content
                v-list-item-title 黑名單
            v-list-item-icon
                v-icon mdi-chevron-right
            BlacklistDialog(v-model="showBlacklist")

    v-divider

    v-list(subheader)
        //- v-subheader(inset) 控制
        v-list-item(v-if="!isLogin", to="/login")
            v-list-item-icon
                v-icon mdi-login-variant
            v-list-item-content
                v-list-item-title 登入

        v-list-item(v-if="isLogin", @click="logoutDialog.show = true")
            v-list-item-icon
                v-icon mdi-logout-variant
            v-list-item-content
                v-list-item-title 登出

            v-dialog(v-model="logoutDialog.show", max-width="300")
                v-card
                    v-card-title 確定要登出嗎?
                    v-card-actions
                        v-spacer
                        v-btn(
                            outlined,
                            color="error",
                            @click="logoutDialog.show = false"
                        ) 取消
                        v-btn(
                            outlined,
                            color="primary",
                            :loading="logoutDialog.loading",
                            @click="logout"
                        ) 登出
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import BlacklistDialog from '@/client/components/BlacklistDialog.vue'
import { sendMessage } from '../sysmsg'
import { IAccount } from '@/server/models'

const Account = namespace('Account')

@Component({ components: { BlacklistDialog } })
export default class extends Vue {
    @Account.State account!: IAccount
    @Account.State isJobSeeker!: boolean
    @Account.State isLogin!: boolean
    @Account.Action('logout') _logout!: Function
    @Account.Action('switchUserState') _switchUserState!: Function

    showBlacklist = false

    logoutDialog = {
        show: false,
        loading: false
    }

    get name() {
        return this.account?.personal?.nameZH
    }

    async logout() {
        this.logoutDialog.loading = true
        const status = await this._logout()
        switch (status) {
            case 204:
                sendMessage('已登出')
                this.logoutDialog.show = false
                location.replace('/')
                break

            case 401:
                sendMessage('尚未登入', { color: 'error' })
                break

            default:
                sendMessage('未知的錯誤', { color: 'error' })
        }
        this.logoutDialog.loading = false
    }

    async switchUserState() {
        const isJobSeeker = await this._switchUserState()
        sendMessage(`已切換模式：${isJobSeeker ? '應徵者' : '刊登者'}`)
    }

    mounted() {
        
    }
}

</script>

<style lang="scss" scoped>
</style>
