<template lang="pug">
v-container(fill-height, fluid)
    v-row(align="center", justify="center")
        v-btn.mr-2(text, outlined, @click="increase(-1)", color="error") 減少
        v-chip.mr-2(outlined, color="primary") {{ number }}
        v-btn(text, outlined, @click="increase(1)", color="success") 增加

    v-row(align="center", justify="center")
        v-card.pa-4(width="500")
            | 雙向綁定
            v-text-field(v-model="input")
            | 單向綁定
            v-text-field(:value="input")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    number = 0
    input = ''

    increase (n: number) {
        this.number += n
    }
}
</script>

<style lang="scss" scoped>
</style>
