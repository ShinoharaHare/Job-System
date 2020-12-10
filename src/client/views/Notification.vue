<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 通知

    v-list
        span(:key="i", v-for="({ name, content }, i) in messages")
            v-list-item
                v-list-item-avatar
                    v-icon mdi-bullhorn-outline

                v-list-item-content
                    v-list-item-title {{ name }}
                    v-list-item-subtitle {{ content }}

            v-divider(v-if="i < count - 1" )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Notification = namespace('Notification');

@Component
export default class extends Vue {
    @Notification.Action
    getList!: Function

    messages: any[] = []

    get count () {
        return this.messages.length
    }

    async mounted () {
        this.messages = await this.getList();
        console.log("from vue");
        console.log(this.messages);
 
        // for (let i = 0; i < 25; i++) {
        //     this.messages.push({
        //         title: 'XXX接受你的履歷了!',
        //         content: '海洋大學店的抓雞雞...'
        //     })
        // }
    }
}
</script>

<style lang="scss" scoped>
</style>
