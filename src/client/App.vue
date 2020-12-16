<template lang="pug">
v-app(dark)
    v-main
        v-slide-x-transition(mode="out-in")
            router-view

    Navigation
    SystemMessage
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import SystemMessage from '@/client/components/SystemMessage.vue'
import Navigation from '@/client/components/Navigation.vue'

import { namespace } from 'vuex-class'
const Account = namespace('Account')

@Component({ components: { SystemMessage, Navigation } })
export default class extends Vue {
    @Account.Action getAccountInfo!: Function

    created() {
        this.getAccountInfo()
    }
}
</script>

<style lang="scss">
</style>
