<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(dark, color="primary")
        v-toolbar-title 刊登管理

    v-expansion-panels.mt-8(tile, popout, focusable)
        v-expansion-panel(v-for="({ name }, i) in jobs", :key="i")
            v-expansion-panel-header {{ name }}
            v-expansion-panel-content
                v-card-actions
                    v-spacer
                    v-btn(color="error") 移除
                    v-btn(color="success") 修改
                    v-btn(color="warning" @click="showCandidates = true") 應徵者

    v-btn(fixed, bottom, right, fab, dark, color="primary", to="/job/new")
        v-icon mdi-plus

    CandidatesDialog(v-model="showCandidates")
    EditJobDialog(v-model="showEditor")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CandidatesDialog from '@/client/components/CandidatesDialog.vue'
import EditJobDialog from '@/client/components/EditJobDialog.vue'

@Component({ components: { CandidatesDialog, EditJobDialog } })
export default class extends Vue {
    jobs: any[] = []
    showCandidates = false
    showEditor = false

    async mounted() {
        // console.log(69, await axios.get('api/job'));
        const { data } = await axios.get('api/job');
        this.jobs = data;
    }
}
</script>

<style lang="scss" scoped>
.v-btn--fixed.v-btn--bottom {
    bottom: 64px !important;
}
</style>
