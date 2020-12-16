<template lang="pug">
v-bottom-navigation(app, grow, shift, color="primary" v-if="show" )
    v-btn(
        :to="path",
        :key="path",
        v-for="{ path, text, icon } in items",
        height="inherit"
    )
        span {{ text }}
        v-icon {{ icon }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class extends Vue {
    items = [
        {
            path: '/',
            text: '主頁',
            icon: 'mdi-home'
        },
        {
            path: '/published',
            text: '刊登管理',
            icon: 'mdi-briefcase'
        },
        {
            path: '/applied',
            text: '應徵管理',
            icon: 'mdi-file-document'
        },
        {
            path: '/favorite',
            text: '收藏',
            icon: 'mdi-heart'
        },
        {
            path: '/notification',
            text: '通知',
            icon: 'mdi-bell'
        },
        {
            path: '/setting',
            text: '設定',
            icon: 'mdi-cog'
        }
    ]

    get show() {
        return this.items.findIndex(v => v.path === this.$route.path) !== -1
    }
}

</script>
