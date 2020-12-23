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

@Component
export default class extends Vue {
    async getList() {
        const { data } = await axios.post('/api/notification/list');
        console.log('from ts');
        console.log(data);
        return data;
    }

    messages: any[] = []

    get count() {
        return this.messages.length
    }

    async mounted() {
        this.messages = await this.getList();
        console.log('from vue');
        console.log(this.messages);
    }
}
</script>

<style lang="scss" scoped>
</style>
