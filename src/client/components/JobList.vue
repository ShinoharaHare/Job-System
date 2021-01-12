<template lang="pug">
v-card(
    :outlined="outlined",
    :loading="loading",
    :disabled="loading",
    :height="height",
    :width="width"
)
    v-list.py-0(
        two-line,
        :height="`calc(${height} - 5px)`",
        :width="width",
        v-if="items.length > 0"
    )
        template(v-for="({ _id, title, tags }, i) in items")
            v-list-item(@click="toJobPage(_id)", :key="_id")
                v-list-item-avatar
                    v-icon mdi-briefcase-variant

                v-list-item-content
                    v-list-item-title
                        h4 {{ title }}

                    v-list-item-subtitle
                        v-chip.mr-1(
                            x-small,
                            v-for="(tag, i) in tags",
                            :key="i",
                            color="primary"
                        ) {{ tag }}

                v-list-item-avatar(v-if="isLogin")
                    v-btn(
                        icon,
                        large,
                        @click.stop="unfavorite(_id)",
                        v-if="isFavorite(_id)"
                    )
                        v-icon(color="pink") mdi-heart

                    v-btn(icon, large, @click.stop="favorite(_id)", v-else)
                        v-icon mdi-heart-outline

            v-divider(v-if="i < items.length - 1")

    v-card-text.text-center(v-else) 沒有資料
</template>

<script lang="ts">
import { IAccount } from '@/server/models'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Account = namespace('Account')

@Component
export default class extends Vue {
    @Prop({ default: () => [] }) items!: any[]
    @Prop() height!: string
    @Prop() width!: string
    @Prop() outlined!: boolean
    @Prop() loading!: boolean
    @Prop() disabled!: boolean


    @Account.State account!: IAccount
    @Account.State isLogin!: boolean
    @Account.Action favorite!: Function
    @Account.Action unfavorite!: Function

    isFavorite(id: string) {
        if (this.isLogin)
            return this.account.favorite!.findIndex((x: any) => x == id) != -1
    }

    toJobPage(id: string) {
        this.$router.push(`/job/${id}`)
    }
}
</script>

<style lang="scss" scoped>
.v-list {
    overflow-y: scroll;
}
</style>
