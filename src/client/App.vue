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

@Component({ components: { SystemMessage, Navigation } })
export default class extends Vue {

}
</script>

<style lang="scss">
</style>
