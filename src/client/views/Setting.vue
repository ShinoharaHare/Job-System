<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 設定

    v-list(two-line)
        v-list-item
            v-list-item-avatar
                //- v-img(:src="avatar")
                v-icon(large) mdi-account-outline

            v-list-item-content
                v-list-item-title.headline {{ name }}
                v-list-item-subtitle 編輯資料
                    v-icon mdi-chevron-right

    v-divider

    v-list(subheader)
        //- v-subheader(inset) 控制

        v-list-item(@click="")
            v-list-item-icon
                v-icon mdi-swap-horizontal
            v-list-item-content
                v-list-item-title 切換模式

        v-list-item(@click="showResumeTemplate = true")
            v-list-item-icon
                v-icon mdi-text-box-outline
            v-list-item-content
                v-list-item-title 履歷範本
            v-list-item-icon
                v-icon mdi-chevron-right
            ResumeTemplatesDialog(v-model="showResumeTemplate")

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
        v-list-item(@click="$router.push('Register')")
            v-list-item-icon
                v-icon mdi-account-plus-outline
            v-list-item-content
                v-list-item-title 註冊

        v-list-item(@click="$router.push('Login')")
            v-list-item-icon
                v-icon mdi-login-variant
            v-list-item-content
                v-list-item-title 登入

        v-list-item(@click="logout")
            v-list-item-icon
                v-icon mdi-logout-variant
            v-list-item-content
                v-list-item-title 登出
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BlacklistDialog from '@/client/components/BlacklistDialog.vue'
import ResumeTemplatesDialog from '@/client/components/ResumeTemplatesDialog.vue'
import { namespace } from 'vuex-class'

const Account = namespace('Account')

@Component({ components: { BlacklistDialog, ResumeTemplatesDialog } })
export default class extends Vue {
    name = '何文子'
    avatar = 'https://www.flaticon.com/svg/static/icons/svg/147/147144.svg'
    showBlacklist = false
    showResumeTemplate = false

    async logout() {
        const { status } = await axios.post('/api/account/logout')
        if (status === 204) {
            location.reload()
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
