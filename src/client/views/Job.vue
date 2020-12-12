<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

        v-toolbarti-title 工作說明

        v-spacer

        v-btn(icon, @click="")
            v-icon mdi-share-variant-outline

    QuillEditor(:options="{ readOnly: true }", noToolbar)

    v-footer(absolute, padless)
        v-card(tile, width="100%")
            v-card-actions
                v-btn(icon, large)
                    v-icon mdi-heart-outline
                v-btn.mx-auto(color="warning", width="70%") 我要應徵
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import QuillEditor from '@/client/components/QuillEditor.vue'
import { IJob } from '@/server/models'
import router from '../router'

@Component({ components: { QuillEditor } })
export default class extends Vue {
    job!: IJob | null
    back() {
        this.$router.back()
    }

    async mounted() {
        const id = this.$route.params.id
        const { status, data } = await axios.get(`/api/job/${id}`)

        switch (status) {
        case 200:
            this.job = data
            break
        case 404:
            // 導向到404頁面
            // this.$router.push('/404')
            break
        }
    }
}
</script>

<style lang="scss" scoped>
.v-list-item__subtitle {
    margin-top: 4px;
    padding-left: 16px;
}
</style>
