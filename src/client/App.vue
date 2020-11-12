<template lang="pug">
v-app
    v-main
        router-view

    v-bottom-navigation(app, grow, shift)
        v-btn(
            :to="path",
            :key="path",
            v-for="{ path, title, icon } in pages",
            height="inherit"
        )
            span {{ title }}
            v-icon {{ icon }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    pages = [
        {
            path: '/page1',
            title: 'Page1',
            icon: 'mdi-numeric-1-box'
        },
        {
            path: '/page2',
            title: 'Page2',
            icon: 'mdi-numeric-2-box'
        }
    ]
}
</script>

<style lang="scss" scoped>
</style>
