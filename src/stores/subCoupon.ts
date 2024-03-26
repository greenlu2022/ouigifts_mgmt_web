import {defineStore} from "pinia";
import Coupon from "@/types/Coupon.ts";

export const useCouponSubStore = defineStore('couponSub', {
    state: (): {
        coupons: Coupon[]
    } => ({coupons: []}),
    getters: {},
    actions: {}
})