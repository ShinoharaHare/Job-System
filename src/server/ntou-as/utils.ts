import * as cheerio from 'cheerio'

export function parseMessage(html: string) {
    const $ = cheerio.load(html)
    const script = $('script').last().html()!
    let group = /Message\.openSuccess\(\'(.+?)\'\)/.exec(script)
    let message = group ? group[1] : ''
    message = message.replace(/\\n/gm, '\n')
    group = /alert\(\'(.+?)\'\)/.exec(script)
    let alert = group ? group[1] : ''
    alert = alert.replace(/\\n/gm, '\n')
    return { message, alert }
}

export function extractHiddens(html: string) {
    const $ = cheerio.load(html)
    const data: any = {}
    $('input[type=hidden]').each((_, x) => {
        data[x.attribs.name] = x.attribs.value
    })
    return data
}

export function mapSegment2Time(segment: string) {
    const segmentMap = [
        { start: '06:20', end: '08:10' },
        { start: '08:20', end: '09:10' },
        { start: '09:20', end: '10:10' },
        { start: '10:20', end: '11:10' },
        { start: '11:15', end: '12:05' },
        { start: '12:10', end: '13:00' },
        { start: '13:10', end: '14:00' },
        { start: '14:10', end: '15:00' },
        { start: '15:10', end: '16:00' },
        { start: '16:05', end: '16:55' },
        { start: '17:30', end: '18:20' },
        { start: '18:30', end: '19:20' },
        { start: '19:25', end: '20:15' },
        { start: '20:20', end: '21:10' },
        { start: '21:15', end: '22:05' }
    ]
}
