<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 刊登管理

    v-list(two-line, outlined)
        v-list-group(v-for="({ title, content }, i) in jobs", :key="i")
            template(v-slot:activator)
                v-list-item-content.mx-5
                    v-list-item-title
                        h3 {{ title }}
                    v-list-item-subtitle
                        v-chip.mr-1(
                            x-small,
                            color="primary",
                            :key="i",
                            v-for="(tag, i) in jobs.tags"
                        ) {{ tag }}

            v-divider

            v-list-item
                v-list-item-content
                    v-list-item-title {{ content }}

            v-list-item
                v-list-item-content(align="right ")
                    span
                        v-btn.mr-1(color="error") 移除
                        v-btn.mr-1(color="success") 修改
                        v-btn.mr-1(
                            color="warning",
                            @click="showCandidates = true"
                        ) 應徵者

            v-divider

    v-btn(fixed, bottom, right, fab, dark, color="primary", to="/job/new")
        v-icon mdi-plus

    CandidatesDialog(v-model="showCandidates")
    EditJobDialog(v-model="showEditor")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IAccount } from '@/server/models'

import CandidatesDialog from '@/client/components/CandidatesDialog.vue'
import EditJobDialog from '@/client/components/EditJobDialog.vue'

const Account = namespace('Account')

@Component({ components: { CandidatesDialog, EditJobDialog } })
export default class extends Vue {
    @Account.State account!: IAccount
    jobs: any[] = []
    showCandidates = false
    showEditor = false

    toEditJob(id: string) {
        this.$router.push(`/job/${id}/edit`)
    }

    async loadJobs() {
        let { status, data } = await axios.get('api/job', { params: { type: 'published' } })
        if (status === 200) {
            this.jobs = data
        }
    }

    mounted() {
        this.loadJobs()
    }
}
</script>

<style lang="scss" scoped>
.v-btn--fixed.v-btn--bottom {
    bottom: 64px !important;
}
</style>
