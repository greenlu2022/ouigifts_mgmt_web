import CouponType from "@/types/CouponType.ts";

const mainCoupons: CouponType[] = [{
    id: 1,
    categoryIds: [1, 2],
    name: "Apple",
    code: "APPLE_202403",
    isLimited: true,
    availableAmount: 1000,
    startTime: '2023-12-31 00:00:00',
    endTime: '2024-12-31 23:59:59',
    imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    isEnabled: true,
}, {
    id: 2,
    categoryIds: [1],
    name: "Google",
    code: "APPLE_202403",
    isLimited: true,
    availableAmount: 1000,
    startTime: '2023-12-31 00:00:00',
    endTime: '2024-12-31 23:59:59',
    imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    isEnabled: true,
}]