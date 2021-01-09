<template lang="pug">
v-list(three-line, :height="height" :width="width")
    span(:key="i", v-for="({ title, location, tags }, i) in items")
        v-list-item(@click="showJob")
            //- v-list-item-avatar
            v-list-item-avatar
                v-icon mdi-briefcase-variant

            v-list-item-content
                v-list-item-title {{ title }}
                v-list-item-subtitle {{ location }}
                v-list-item-subtitle
                    v-chip.mr-1(
                        x-small,
                        v-for="(tag, i) in tags",
                        :key="i",
                        color="primary"
                    ) {{ tag }}
            v-list-item-avatar
                v-btn(icon @click.stop="" )
                    v-icon() mdi-heart-outline
            //- v-list-item-avatar
            //-     v-icon mdi-heart-outline

        v-divider(v-if="i < count - 1")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    items!: any[]

    @Prop()
    height = 'auto'

    @Prop()
    width = 'auto'

    showJob() {
        this.$router.push('/job')
    }

    get count() {
        return this.items.length
    }
}
</script>

<style lang="scss" scoped>
.v-list {
    overflow-y: scroll;
}
</style>
