<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-btn(icon, @click="")
            v-icon mdi-arrow-left

        v-toolbarti-title 工作說明

        v-spacer

        v-btn(icon, @click="")
            v-icon mdi-share-variant-outline

    //- v-speed-dial(bottom, right)
    //-     template(#activator)
    //-         v-btn(fab, color="success", @click="")

    v-card-title {{ title }}

    v-divider.mx-4

    v-list(two-line)
        v-list-item
            v-list-item-content
                v-list-item-title 工作內容
                v-list-item-subtitle
                    pre {{ description }}

        v-list-item
            v-list-item-content
                v-list-item-title 工作待遇
                v-list-item-subtitle {{ salary }}

        v-list-item
            v-list-item-content
                v-list-item-title 工作地點
                v-list-item-subtitle {{ location }}

        v-divider.mx-4

        v-list-item
            v-list-item-content
                v-list-item-title 任務時間
                v-list-item-subtitle {{ time }}

        v-list-item
            v-list-item-content
                v-list-item-title 需求人數
                v-list-item-subtitle {{ number }}人

        v-divider.mx-4

        v-list-item
            v-list-item-content
                v-list-item-title 聯絡資訊
                v-list-item-subtitle {{ contact }}

    v-footer(absolute, padless)
        v-card(tile, width="100%")
            v-card-actions
                v-btn(icon, large)
                    v-icon mdi-heart-outline
                v-btn.mx-auto(color="warning", width="70%") 我要應徵
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    title = '抓雞雞'
    salary = '單次 $10'
    description = '幫忙抓雞雞'
    location = '海洋大學店'

    time = '一直抓'
    number = 1
    contact = '09xxxxxxxx'
}
</script>

<style lang="scss" scoped>
.v-list-item__subtitle {
    margin-top: 4px;
    padding-left: 16px;
}
</style>
