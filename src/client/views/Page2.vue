<template lang="pug">
v-container(fill-height, fluid)
    v-row(align="center", justify="center")
        v-col.text-center(v-for="color in colors", :key="color")
            v-progress-circular(v-model="value", :color="color", size="100") {{ value }}

    v-row(align="center", justify="center")
            v-btn.mr-2(@click="show = !show", color="primary") {{ text }}
            v-chip(v-if="show", color="success") Dummy
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    value = 0
    step = 10
    colors = ['cyan', 'green', 'pink']
    show = true

    get text () {
        return this.show ? '隱藏' : '顯示'
    }

    mounted () {
        setInterval(() => {
            this.value += this.step
            this.step *= this.value === 100 || this.value === 0 ? -1 : 1
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>
</style>
