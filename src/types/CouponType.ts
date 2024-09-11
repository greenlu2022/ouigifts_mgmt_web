import type {ID} from "@/types/utilsType.ts";

export default interface CouponType {
    id?: ID,
    categoryIds: number[],
    name: string,
    code: string,
    isLimited: boolean,
    // discountType: number,
    // discountPercentage: number,
    availableAmount: number,
    startTime: string,
    endTime: string,
    imageUrl: string,
    isEnabled: boolean,
}