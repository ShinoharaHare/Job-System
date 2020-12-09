import Account from './account'
import api from './api'
import { extractHiddens } from './utils'

class Course {
    private account: Account

    constructor(account: Account) {
        this.account = account
    }

    async list(ayear: string, sms: string) {
        const $ = await this.account.postAsp$(api.COURSE_LIST, {
            Q_AYEAR: ayear,
            Q_SMS: sms,
            QUERY_BTN3: '選課課表',
            PC$PageSize: 100
        })
        return this.getCourses($)
    }

    async listCurrent() {
        let $ = await this.account.get$(api.COURSE_LIST)
        const data = extractHiddens($.html())
        Object.assign(data, {
            Q_AYEAR: $('#Q_AYEAR').val(),
            Q_SMS: $('#Q_SMS').val(),
            QUERY_BTN3: '選課課表',
            PC$PageSize: 100
        })
        $ = await this.account.post$(api.COURSE_LIST, data)
        return this.getCourses($)
    }

    private getCourses($: cheerio.Root) {
        const courses: any[] = []
        for (let day = 1; day <= 7; day++) {
            for (let seg = 0; seg <= 14; seg++) {
                const a = $($($('#table2 tr')[seg + 1]).find('td')[day]).find('a')[0]
                if (a) {
                    courses.push({
                        name: a.children[0].data,
                        time: `${day}${String(seg).padStart(2, '0')}`
                    })
                }
            }
        }
        return courses
    }
}

export default Course
