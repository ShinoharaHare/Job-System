import Account from './account'

export { default as api } from './api'
export { default as Account } from './account'
export async function login(id: string, pw: string) {
    const account = new Account(id, pw)
    await account.login()
    return account
}
