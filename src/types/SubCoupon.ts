import type {ID} from "@/types/utilsType.ts";

export default interface SubCoupon {
    id?: ID,
    couponTypeId?: string,
    couponCode?: string,
    collectedBy?: string,
    generatedTime?: string,
    redeemedAt?: string,
    redeemedTime: string,
}