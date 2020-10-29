<template lang="pug">
v-app
    v-main.align-center
        v-card.mx-auto(width="500")
            v-data-table(:headers="headers", :items="items")

        v-card.mx-auto.mt-4(width="500")
            v-data-table(:headers="headers2", :items="items2")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    headers = [
        { text: '名稱', value: 'name' },
        { text: '薪水', value: 'salary' }
    ]

    items = [] as any[]

    headers2 = [
        { text: '姓名', value: 'name' },
        { text: '性別', value: 'gender' }
    ]

    items2 = [] as any[]

    async mounted () {
        let res = await axios.get('/api/v1/job')
        this.items = res.data

        res = await axios.get('/api/v1/user')
        this.items2 = res.data
    }
}
</script>

<style lang="scss" scoped>
.v-main {
    background: darkcyan;
}
</style>
