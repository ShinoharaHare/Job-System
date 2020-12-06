import Account from './account'
import api from './api'

class Personal {
    private account: Account

    constructor(account: Account) {
        this.account = account
    }

    async read() {
        const $ = await this.account.get$(api.PERSONAL_INFO_CURRENT)
        return {
            nameZH: $('#M_CH_NAME').text(),
            nameEN: $('#M_ENGNAME').val(),
            identity: $('#M_IDNO').text(),
            passport: $('#M_PASSPORT_NO').text(),
            residentCert: $('#M_RESIDENCE_NO').text(),
            nationality: $('#M_NATION_NAME').text(),
            birthday: $('#M_BIRTH_DATE').text(),
            gender: $('#M_SEX_NM').text(),
            bloodType: $('#M_BLOOD').val()
        }
    }
}

export default Personal
