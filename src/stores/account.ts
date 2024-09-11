import {defineStore} from "pinia";
import Account from "@/types/Account.ts";
import accounts from "@/mockData/accounts.ts";

export const useAccountStore = defineStore('account', {
    state: (): {
        accounts: Account[]
    } => ({accounts: []}),
    getters: {},
    actions: {
        getAccounts() {
            const apiAccounts: Account[] = accounts
            if (this.accounts.length > 0) {
                this.clear()
            }
            apiAccounts.forEach(account => {
                this.add(account)
            })
        },
        add(account: Account) {
            this.accounts.push(account)
        },
        addUnshift(account: Account) {
            this.accounts.unshift(account)
        },
        update(account: Account): void {
            const accountIndex = this.accounts.findIndex(item => item.id == account.id)
            this.accounts.splice(accountIndex, 1, account)
        },
        remove(accountId: number): void {
            const accountIndex = this.accounts.findIndex(item => item.id == accountId)
            this.accounts.splice(accountIndex, 1)
        },
        clear() {
            this.accounts = []
        }
    }
})