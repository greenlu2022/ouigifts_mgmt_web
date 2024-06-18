import {defineStore} from "pinia";
import Account from "@/types/Account.ts";

export const useAccountStore = defineStore('account', {
    state: (): {
        coupons: Account[]
    } => ({coupons: []}),
    getters: {},
    actions: {}
})