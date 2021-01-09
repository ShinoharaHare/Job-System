<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    JobEditor(ref="editor")

    v-footer(fixed, padless)
        v-card.flex(tile)
            v-card-actions
                v-spacer
                v-btn(outlined, color="error", @click="$router.back()") 取消
                v-spacer
                v-btn(outlined, color="primary", @click="submit") 新建
                v-spacer
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

import JobEditor from '@/client/components/JobEditor.vue'

@Component({ components: { JobEditor } })
export default class extends Vue {
    @Ref()
    editor!: JobEditor

    async submit() {
        console.log(this.editor.getData())
        // const { status, data } = await axios.post('/api/job', {
        //     data: this.editor.getData()
        // })

        // switch (status) {
        //     case 201:

        //         break

        //     case 401:
        //     case 403:
        // }

        // this.$router.back()
    }

    mounted() {
    }
}
</script>

<style lang="scss" scoped>
</style>