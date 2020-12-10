<template lang="pug">
v-snackbar(app, v-model="show") {{ message }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Sysmsg = namespace('Sysmsg')

@Component
export default class extends Vue {
    @Sysmsg.State
    message!: string

    @Sysmsg.State
    timeout!: number

    @Sysmsg.State
    show!: boolean
}
</script>

<style lang="scss" scoped>
</style>
