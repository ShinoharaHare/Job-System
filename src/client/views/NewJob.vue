<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    JobEditor
    v-card(tile, width="100%")
        v-card-actions
            v-spacer
            v-btn(color="error" @click="") 取消
            v-spacer
            v-btn(color="success" @click="submit()") 確認
            v-spacer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import JobEditor from '@/client/components/JobEditor.vue'

@Component({ components: { JobEditor } })
export default class extends Vue {
    submit(){
        
    }
}
</script>
