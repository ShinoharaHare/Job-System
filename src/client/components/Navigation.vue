<template lang="pug">
v-bottom-navigation(app, grow, shift, color="primary", v-if="show")
    v-btn(
        :to="path",
        :key="path",
        v-for="{ path, text, icon, type} in items",
        v-if="isShowItem(type)"
        height="inherit"
    )
        span {{ text }}
        v-icon {{ icon }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Account.State
    isJobSeeker!: boolean

    @Account.State isLogin!: boolean

    items = [
        {
            path: '/',
            text: '主頁',
            icon: 'mdi-home'
        },
        {
            path: '/published',
            text: '刊登管理',
            icon: 'mdi-briefcase',
            type: 1
        },
        {
            path: '/applied',
            text: '應徵管理',
            icon: 'mdi-file-document',
            type: 0
        },
        {
            path: '/favorite',
            text: '收藏',
            icon: 'mdi-heart',
            type: 0
        },
        {
            path: '/notification',
            text: '通知',
            icon: 'mdi-bell',
            type: 2
        },
        {
            path: '/setting',
            text: '設定',
            icon: 'mdi-cog',
            type: 2
        }
    ]

    get show() {
        return this.items.findIndex(v => v.path === this.$route.path) !== -1
    }

    isShowItem(type: number) {
        switch (type) {
        case 0:
            return this.isLogin && this.isJobSeeker
        case 1:
            return this.isLogin && !this.isJobSeeker
        case 2:
            return this.isLogin
        default:
            return true
        }
    }
}

</script>
