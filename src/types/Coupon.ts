import type {ID} from "@/types/utilsType.ts";

export default interface Coupon {
    id?: ID,
    couponTypeId?: string,
    seriesNumber?: string,
    couponCode?: string,
    restriction?: string[],
    startTime?: string,
    endTime?: string,
    imageUrl?: string,
    generatedTime?: string,
    redeemedBy?: string,
    redeemedAt?: string,
    redeemedTime: string,
    isRedeemed?: boolean,
    isEnabled?: boolean,
}