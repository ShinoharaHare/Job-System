<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left
        v-spacer
        v-btn(icon @click="save")
            v-icon mdi-check

    v-card-text
        Timetable(ref="timetable")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import Timetable from '@/client/components/Timetable.vue'
import { get } from 'mongoose'

const Acccount = namespace('Account')

@Component({ components: { Timetable } })
export default class extends Vue {
    timetable!: any

    async save() {
        const { status } = await axios.patch('/api/account', {
            data: { events: this.timetable.getData() }
        })

        if (status === 200) {

        } else {

        }
    }

    async getData() {
        const { status, data } = await axios.get('/api/account', {
            params: { fields: ['events'] }
        })
        if (status === 200) {
            this.timetable.setData(data.events)
        } else {

        }
    }

    mounted() {
        this.timetable = this.$refs.timetable
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
.v-toolbar {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
}

.v-card__text {
    padding-top: 56px;
}
</style>
