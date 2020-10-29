<template lang="pug">
v-app
    v-main
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.v-main {
    background: darkcyan;
}
</style>
