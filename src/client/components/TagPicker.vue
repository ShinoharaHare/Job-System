<template lang="pug">
v-autocomplete(
    outlined,
    chips,
    small-chips,
    multiple,
    deletable-chips,
    auto-select-first,
    :loading="loading",
    :hide-no-data="!search",
    :items="tags",
    :search-input.sync="search",
    :label="label",
    :disabled="readonly",
    :readonly="readonly",
    v-model="model"
)
    template(#selection="{ item, parent }")
        v-chip(
            small,
            color="secondary",
            :close="!readonly",
            @click:close="parent.selectItem(item)"
        ) {{ item }}

    template(#no-data, v-if="allowCreate")
        v-list-item(@click="create")
            span.subheading 點擊或Enter新建
            v-chip.ml-1(color="secondary") {{ search }}
</template>

<script lang="ts">
import { ITag } from '@/server/models'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop() value!: string[]
    @Prop() label!: string
    @Prop() readOnly!: boolean
    @Prop() allowCreate!: boolean

    tags: any[] = []
    search = ''
    model: any[] = []
    loading = false

    get readonly() {
        if (typeof this.readOnly == 'boolean') {
            return this.readOnly
        }
        return this.readOnly == undefined ? false : true
    }

    create() {
        this.tags.push(this.search)
        this.model.push(this.search)
        this.search = ''
    }

    async loadTags() {
        this.loading = true
        let { status, data } = await axios.get('/api/job/tags')
        this.loading = false

        if (status == 200) {
            this.tags = data.map((x: any) => x.name)
        }
    }

    @Watch('value', { immediate: true, deep: true })
    onValueChange(v: string[], p: string[]) {
        this.model = this.value
    }

    @Watch('model', { immediate: true, deep: true })
    onModelChange(v: string[], p: string[]) {
        this.$emit('input', v)
    }

    mounted() {
        this.loadTags()
    }
}
</script>