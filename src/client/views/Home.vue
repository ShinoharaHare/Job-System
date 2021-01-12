<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark)
        v-avatar.ma-1(tile)
            v-img(
                contain,
                transition="fab-transition",
                :src="require('@/client/assets/hen.svg')"
            )

        span.text-h5 小雞雞上工

        v-spacer
        v-toolbar-items
            v-btn(icon, text, to="/login", width="100", v-if="!isLogin") 
                v-icon mdi-login-variant
                span.ml-1 登入

    v-card-text
        v-container
            v-row
                v-col.pb-0
                    v-text-field(
                        prepend-inner-icon="mdi-magnify",
                        solo,
                        clearable
                    )
                        template(#append)
                            v-btn(color="primary") 搜尋
            v-row
                v-col.d-flex.px-0.py-0
                    v-select(
                        :items="district",
                        label="地區",
                        single,
                        outlined,
                        clearable,
                        @changed=""
                    )
                v-col.d-flex.px-0.py-0
                    v-select(
                        v-model="typeValue",
                        :items="type",
                        label="類型",
                        multiple,
                        outlined,
                        clearable,
                        @changed=""
                    )
                        template(v-slot:selection="{ item, index }")
                            v-chip(v-if="index === 0")
                                span {{ item }}
                            span.grey--text.caption(v-if="index === 1")
                                | ({{ typeValue.length }})

            v-row
                v-col.pa-0
                    v-card
                        JobList(:items="jobs", :height="jobListHeight")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import JobList from '@/client/components/JobList.vue'

const Account = namespace('Account')

@Component({ components: { JobList } })
export default class extends Vue {
    @Account.State isLogin!: boolean

    district = ['中正區', '信義區']
    value = ['foo', 'bar', 'fizz', 'buzz']
    type = ['短期', '長期', '假日', '平日']

    typeValue = []

    jobs: any[] = []

    get jobListHeight() {
        let h = this.isLogin ? 350 : 300
        return `calc(100vh - ${h}px)`
    }

    async loadJobs() {
        let { status, data } = await axios.get('/api/job/all')
        if (status === 200)
            this.jobs = data
    }

    mounted() {
        this.loadJobs()
    }
}
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
    padding: 0px !important;
}
</style>
