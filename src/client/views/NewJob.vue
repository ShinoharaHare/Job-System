<template lang="pug">
v-card(flat, tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back()")
            v-icon mdi-arrow-left

    JobEditor

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import JobEditor from '@/client/components/JobEditor.vue'

@Component({ components: { JobEditor } })
export default class extends Vue {

}
</script>
