<template lang="pug">
v-card(tile, height="100%")
    v-card-text
        v-container
            v-row
                v-col
                    v-text-field(append-outer-icon="mdi-magnify")

            v-row
                v-col
                    v-carousel(height="270")
                        v-carousel-item(
                            :key="i",
                            :src="item.src",
                            v-for="(item, i) in items"
                        )

            v-row
                v-col
                    v-card
                        JobList(:items="jobs", height="300")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JobList from '@/client/components/JobList.vue'

@Component({ components: { JobList } })
export default class extends Vue {
    items = [
        {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
    ]

    jobs: any[] = []

    mounted() {
        for (let i = 0; i < 10; i++) {
            this.jobs.push({
                title: '外場人員',
                location: '海洋大學店',
                tags: ['短期', '假日']
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#job-list-container {
    max-height: 0px;
    overflow-y: scroll;
}
</style>
