<template lang="pug">
v-card(flat, tile)
    v-calendar.timetable(
        ref="calendar",
        type="week",
        :now="now",
        :value="now",
        :weekdays="weekdays",
        :events="events",
        :first-interval="firstInterval",
        :interval-width="intervalWidth",
        disabled,
        @click:event="onClickEvent",
        @click:time="onClickTime"
    )

    v-dialog(v-model="removeDialog.show", max-width="300")
        v-card
            v-card-title 移除事件
            v-card-text 確定要移除事件
                span.red--text.font-weight-bold {{ removeDialog.title }}
                | 嗎?

            v-card-actions
                v-spacer
                v-btn(
                    text,
                    color="primary",
                    @click="removeDialog.show = false"
                ) 取消
                v-btn(text, color="error", @click="remove") 移除

    v-dialog(persistent, max-width="300", v-model="addDialog.show")
        v-card
            v-card-title 新增事件
            v-form(v-model="addDialog.valid")
                v-card-text
                    v-text-field(
                        required,
                        label="標題",
                        v-model="addDialog.title",
                        :rules="[required]"
                    )

                    v-select(
                        required,
                        v-model="addDialog.weekday",
                        prepend-icon="mdi-calendar-range",
                        :items="addDialog.weekdays",
                        :rules="[required]"
                    )

                    v-menu(
                        ref="menu1",
                        transition="scale-transition",
                        v-model="addDialog.menu1",
                        :close-on-content-click="false",
                        :return-value.sync="addDialog.start"
                    )
                        template(v-slot:activator="{ on, attrs }")
                            v-text-field(
                                required,
                                readonly,
                                label="開始時間",
                                prepend-icon="mdi-clock-time-twelve-outline",
                                :rules="[required]",
                                v-model="addDialog.start",
                                v-bind="attrs",
                                v-on="on"
                            )

                        v-time-picker(
                            v-if="addDialog.menu1",
                            v-model="addDialog.start",
                            @click:minute="$refs.menu1.save(addDialog.start)"
                        )

                    v-menu(
                        ref="menu2",
                        transition="scale-transition",
                        v-model="addDialog.menu2",
                        :close-on-content-click="false",
                        :return-value.sync="addDialog.end"
                    )
                        template(v-slot:activator="{ on, attrs }")
                            v-text-field(
                                required,
                                readonly,
                                label="結束時間",
                                prepend-icon="mdi-clock-outline",
                                :rules="[required]",
                                v-model="addDialog.end",
                                v-bind="attrs",
                                v-on="on"
                            )

                        v-time-picker(
                            v-if="addDialog.menu2",
                            v-model="addDialog.end",
                            @click:minute="$refs.menu2.save(addDialog.end)"
                        )

                v-card-actions
                    v-spacer
                    v-btn(text, color="error", @click="addDialog.show = false") 取消
                    v-btn(
                        text,
                        color="primary",
                        :disabled="!addDialog.valid",
                        @click="add"
                    ) 新增
</template>

<script lang="ts">
import { IEvent } from '@/server/models'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    events: any[] = []
    weekdays = [1, 2, 3, 4, 5, 6, 0]
    firstInterval = 0
    intervalWidth = 100
    now = '2020-12-7'
    calendar!: any

    isEventClicked = false

    required = (v: string) => v !== '' || '必填'

    addDialog = {
        weekdays: [
            { text: '星期一', value: 1 },
            { text: '星期二', value: 2 },
            { text: '星期三', value: 3 },
            { text: '星期四', value: 4 },
            { text: '星期五', value: 5 },
            { text: '星期六', value: 6 },
            { text: '星期日', value: 7 }
        ],
        show: false,
        title: '',
        weekday: 0,
        start: '',
        end: '',
        valid: false,
        menu1: false,
        menu2: false
    }

    removeDialog = {
        show: false,
        title: ''
    }

    onClickTime({ weekday, time }: any) {
        if (!this.removeDialog.show) {
            this.addDialog.title = ''
            this.addDialog.weekday = weekday === 0 ? 7 : weekday
            this.addDialog.start = time
            this.addDialog.end = time
            this.addDialog.show = true
        }
    }

    onClickEvent({ event }: any) {
        this.removeDialog.show = true
        this.removeDialog.title = event.name
    }

    weekdayToDate(weekday: number) {
        return `2020-12-${6 + Number(weekday)}`
    }

    add() {
        const date = this.weekdayToDate(this.addDialog.weekday)
        this.events.push({
            name: this.addDialog.title,
            start: `${date} ${this.addDialog.start}`,
            end: `${date} ${this.addDialog.end}`
        })
        this.addDialog.show = false
    }

    remove() {
        this.events = this.events.filter(x => x.name !== this.removeDialog.title)
        this.removeDialog.show = false
    }

    setData(data: IEvent[]) {
        for (const e of data) {
            const date = this.weekdayToDate(e.weekday)
            this.events.push({
                name: e.name,
                start: `${date} ${e.start}`,
                end: `${date} ${e.end}`
            })
        }
    }

    getData() {
        const arr: any[] = []
        for (const e of this.events) {
            const start = this.calendar.parseTimestamp(e.start)
            const end = this.calendar.parseTimestamp(e.end)

            arr.push({
                name: e.name,
                weekday: start.weekday,
                start: `${String(start.hour).padStart(2, '0')}:${String(start.minute).padStart(2, '0')}`,
                end: `${String(end.hour).padStart(2, '0')}:${String(end.minute).padStart(2, '0')}`
            })
        }
        return arr
    }

    mounted() {
        this.calendar = this.$refs.calendar
        this.calendar.scrollToTime('8:00')
    }
}
</script>

<style lang="scss">
.timetable .v-calendar-daily_head-day-label {
    display: none;
}
</style>
