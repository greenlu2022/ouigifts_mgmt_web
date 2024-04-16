import {defineStore} from "pinia";
import CouponType from "@/types/CouponType.ts";

export const useMainCouponStore = defineStore('mainCoupon', {
    state: (): {
        mainCoupons: CouponType[]
    } => ({mainCoupons: []}),
    getters: {},
    actions: {
        getMainCoupons() {
            const apiMainCoupons: CouponType[] = [{
                id: 1,
                categoryIds: ["1", "2"],
                name: "Apple",
                code: "APPLE_202403",
                isLimited: true,
                discountType: 1,
                discountPercentage: 20,
                availableArea: [],
                availableAmount: 1000,
                restriction: [],
                startTime: '2023-12-31 00:00:00',
                endTime: '2024-12-31 23:59:59',
                imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
                isEnabled: true,
            }, {
                id: 2,
                categoryIds: ["1"],
                name: "Google",
                code: "APPLE_202403",
                isLimited: true,
                discountType: 1,
                discountPercentage: 20,
                availableArea: [],
                availableAmount: 1000,
                restriction: [],
                startTime: '2023-12-31 00:00:00',
                endTime: '2024-12-31 23:59:59',
                imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
                isEnabled: true,
            }]
            if (this.mainCoupons.length > 0) {
                this.clear()
            }
            apiMainCoupons.forEach(coupon => {
                this.add(coupon)
            })
        },
        add(coupon: CouponType) {
            this.mainCoupons.push(coupon)
        },
        addFirst(coupon: CouponType) {
            this.mainCoupons.unshift(coupon)
        },
        update(coupon: CouponType): void {
            const index = this.mainCoupons.findIndex(item => item.id == coupon.id)
            this.mainCoupons.splice(index, 1, coupon)
        },
        remove(couponTypeId: number): void {
            const index = this.mainCoupons.findIndex(item => item.id == couponTypeId)
            this.mainCoupons.splice(index, 1)
        },
        clear() {
            this.mainCoupons = []
        }
    }
})