<template lang="pug">
v-card(tile, height="100%")
    v-toolbar(flat)
        v-btn(icon, @click="$router.back")
            v-icon mdi-arrow-left

    v-container(fill-height, fluid)
        v-row(align="center", justify="center")
            v-col
                v-img(:src="ntouLogo")

                v-card-text.text-center.subtitle-1.font-weight-bold
                    | 連結海大校務系統 輕鬆匯入個人資料!

                v-card-text
                    v-text-field(label="學號", v-model="ntouID")
                    v-text-field(label="密碼", v-model="ntouPW")

                v-card-actions
                    v-spacer
                    v-btn(
                        outlined,
                        color="success",
                        width="70%",
                        :loading="loading",
                        @click="link"
                    ) 連結
                    v-spacer
        v-row
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {
    ntouLogo = require('@/client/assets/ntou-logo.png')
    ntouID = ''
    ntouPW = ''
    loading = false

    async link() {
        this.loading = true
        const { status, data } = await axios.post('/api/account/link-ntou', {
            ntouID: this.ntouID,
            ntouPW: this.ntouPW
        })
        this.loading = false

        switch (data.state) {
        case 0:
            break

        case -1:
            break
        }
    }
}
</script>
