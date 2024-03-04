export default interface Coupon {
    id?: number,
    couponTypeId?: string,
    seriesNumber?: string,
    redeemCode?: string,
    restriction?: string[],
    startTime?: string,
    endTime?: string,
    imageUrl?: string,
    generatedTime?: string,
    redeemedBy?: string,
    redeemedAt?: string,
    redeemedTimeStamp: string,
    isRedeemed?: boolean,
    isEnabled?: boolean,
}