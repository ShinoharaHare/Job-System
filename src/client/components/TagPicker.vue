<template lang="pug">
v-combobox(
    multiple,
    chips,
    outlined,
    hide-selected,
    :filter="filter",
    :hide-no-data="!search",
    :items="items",
    :search-input.sync="search",
    :label="label",
    :readonly="readOnly",
    v-model="model"
)
    template(#no-data)
        v-list-item
            span.subheading 新建
            v-chip.ml-1(color="secondary") {{ search }}

    template(#selection="{ attrs, item, parent, selected }")
        v-chip(
            outlined,
            color="secondary",
            :input-value="selected",
            v-if="item === Object(item)",
            v-bind="attrs"
        )
            span.pr-2 {{ item.text }}
            v-icon(small, @click="parent.selectItem(item)") mdi-close

    template(#item="{ index, item }")
        v-chip(outlined, color="secondary")
            | {{ item.text }}
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop() label!: string
    @Prop() readOnly!: boolean

    items: any[] = [{ header: '選擇或新建標籤' }]
    search = ''
    model: any[] = []

    filter(item: any, queryText: string, itemText: string) {
        if (item.header) return false

        const hasValue = (val: any) => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
    }

    @Watch('model')
    onModelhange(val: any, prev: any) {
        if (val.length === prev.length) return

        this.model = val.map((v: any) => {
            if (typeof v === 'string') {
                v = { text: v, create: true }
                this.items.push(v)
            }
            return v
        })
    }

    getData() {
        let tags = this.model.filter(x => x._id)
        let newTags = this.model.filter(x => !x._id)

        return {
            tags: tags.map((x) => x._id),
            newTags: newTags.map(x => x.text)
        }
    }

    setData(tags: any[]) {

    }
}
</script>