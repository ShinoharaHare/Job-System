<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(color="white")
        v-img.mx-0(contain, max-height="55",max-width="200", :src="logo")
        v-spacer
        v-toolbar-items
            v-btn(flat,to="/login", width="100" v-if="!isLogin") 登入
    v-card-text
        v-container
            v-row
                v-col.pb-0
                    v-text-field(prepend-inner-icon="mdi-magnify",solo,clearable)
                        template(v-slot:append="")
                            v-btn.ma-0(  color="primary") 搜尋
            v-row
                v-col.d-flex.px-0.py-0
                    v-select(:items="district" label="地區" single outlined clearable @changed="")
                v-col.d-flex.px-0.py-0
                    v-select(v-model="typeValue" :items="type" label="類型"  multiple outlined clearable @changed="" )
                        template(v-slot:selection="{ item, index }")
                            v-chip(v-if="index === 0")
                                span {{ item }}
                            span.grey--text.caption(v-if="index === 1")
                                | ({{ typeValue.length}})
            //- v-row
            //-     v-col
            //-         v-carousel(height="270")
            //-             v-carousel-item(
            //-                 :key="i",
            //-                 :src="item.src",
            //-                 v-for="(item, i) in items"
            //-             )

            v-row
                v-col
                    v-card
                        JobList(:items="jobs", height="500")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import JobList from '@/client/components/JobList.vue'
import { namespace } from 'vuex-class'

const Account = namespace('Account')

@Component({ components: { JobList } })
export default class extends Vue {
    @Account.State isLogin!: boolean
    logo = require('@/client/assets/logo/logo_homepage.png')
    drawer = false
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

    district = ['中正區', '信義區']
    value= ['foo', 'bar', 'fizz', 'buzz']
    type = ['短期', '長期', '假日', '平日']
    typeValue = []

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
    ::v-deep .v-toolbar__content {
        padding: 0px !important;
    }
</style>
