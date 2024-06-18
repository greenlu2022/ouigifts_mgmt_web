import {defineStore} from "pinia";
import User from "@/types/User.ts";

export const useUserStore = defineStore('user', {
    state: (): {
        user: User | undefined
    } => ({
        user: undefined
    }),
    getters: {},
    actions: {
        login(user: User) {
            this.user = user
        },
        logout() {
            this.user = undefined
        }
    }
})