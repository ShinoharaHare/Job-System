<template lang="pug">
v-combobox(
    multiple,
    chips,
    outlined,
    hide-selected,
    :loading="loading",
    :filter="filter",
    :hide-no-data="!search",
    :items="items",
    :search-input.sync="search",
    :label="label",
    :disabled="readonly",
    :readonly="readonly",
    v-model="model"
)
    template(#no-data)
        v-list-item
            span.subheading 新建
            v-chip.ml-1(outlined, color="secondary") {{ search }}

    template(#selection="{ attrs, item, parent, selected }")
        v-chip(
            outlined,
            color="secondary",
            :input-value="selected",
            v-if="item === Object(item)",
            v-bind="attrs"
        )
            span.pr-2 {{ item.text }}
            v-icon(small, @click="parent.selectItem(item)", v-if="readOnly") mdi-close

    template(#item="{ index, item }")
        v-chip(outlined, color="secondary")
            | {{ item.text }}
</template>


<script lang="ts">
import { ITag } from '@/server/models'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop() label!: string
    @Prop() readOnly!: boolean

    items: any[] = [{ header: '選擇或新建標籤' }]
    search = ''
    model: any[] = []
    loading = false

    get readonly() {
        return this.readOnly !== undefined ? this.readOnly : false
    }

    filter(item: any, queryText: string, itemText: string) {
        if (item.header) return false

        const text = itemText || ''
        const query = queryText || ''

        return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
    }

    @Watch('model')
    onModelhange(val: any, prev: any) {
        if (val.length === prev.length) return

        this.model = val.map((v: any) => {
            if (typeof v === 'string') {
                v = { text: v }
                this.items.push(v)
            }
            return v
        })
    }

    getData() {
        return this.model.map(x => x.text)
    }

    setData(tags: string[]) {
        this.model = tags.map(x => ({ text: x }))
    }

    async loadTags() {
        this.loading = true
        let { status, data } = await axios.get('/api/job/tags')
        this.loading = false

        if (status == 200) {
            this.items.push(...data.map((x: any) => ({ text: x.name })))
        }
    }

    mounted() {
        this.loadTags()
    }
}
</script>