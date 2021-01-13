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
        v-text-field(
            solo,
            clearable,
            prepend-inner-icon="mdi-magnify",
            :append-outer-icon="showTags ? 'mdi-chevron-up' : 'mdi-chevron-down'",
            @click:append-outer="showTags = !showTags",
            v-model="searchText"
        )
            template(#append)
                v-btn(color="primary", @click="search") 搜尋

        v-expand-transition
            div(v-if="showTags")
                v-autocomplete(
                    outlined,
                    clearable,
                    multiple,
                    chips,
                    deletable-chips,
                    label="標籤過濾",
                    :items="allTags",
                    v-model="tags"
                )

        JobList(
            :items="jobs",
            :height="jobListHeight",
            outlined,
            :loading="loading",
            :disabled="loading"
        )
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import JobList from '@/client/components/JobList.vue'
import TagPicker from '@/client/components/TagPicker.vue'

const Account = namespace('Account')

@Component({ components: { JobList, TagPicker } })
export default class extends Vue {
    @Account.State isLogin!: boolean

    searchText = ''
    showTags = false
    allTags = []
    loading = false
    tags: string[] = []
    jobs: any[] = []

    get jobListHeight() {
        let h = 230
        h -= this.isLogin ? 0 : 56
        return `calc(100vh - ${h}px)`
    }

    async loadJobs() {
        let { status, data } = await axios.get('/api/job/all')
        if (status === 200)
            this.jobs = data
    }

    async loadTags() {
        let { status, data } = await axios.get('/api/job/tags')
        if (status === 200)
            this.allTags = data.map((x: any) => x.name)
    }

    async search() {
        this.loading = true
        let { status, data } = await axios.get('/api/job/search', {
            params: {
                title: this.searchText,
                tags: this.tags
            }
        })
        this.loading = false
        this.jobs = data
    }

    mounted() {
        this.loadJobs()
        this.loadTags()
    }
}
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
    padding: 0px !important;
}
</style>
