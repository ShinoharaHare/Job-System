<template lang="pug">
v-app(dark)
    v-main
        v-slide-x-transition(mode="out-in")
            router-view

    v-bottom-navigation(app, grow, shift, color="primary")
        v-btn(
            :to="path",
            :key="path",
            v-for="{ path, text, icon } in links",
            height="inherit"
        )
            span {{ text }}
            v-icon {{ icon }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({ components: {} })
export default class extends Vue {
    links = [
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
            path: '/personal',
            text: '個人',
            icon: 'mdi-account'
        }
    ]
}
</script>

<style lang="scss">

</style>
