<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 通知

    v-list
        span(:key="i", v-for="({ title, content }, i) in messages")
            v-list-item
                v-list-item-avatar
                    v-icon mdi-bullhorn-outline

                v-list-item-content
                    v-list-item-title {{ title }}
                    v-list-item-subtitle {{ content }}

            v-divider(v-if="i < count - 1" )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    messages: any[] = []

    get count () {
        return this.messages.length
    }

    mounted () {
        for (let i = 0; i < 25; i++) {
            this.messages.push({
                title: 'XXX接受你的履歷了!',
                content: '海洋大學店的抓雞雞...'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
