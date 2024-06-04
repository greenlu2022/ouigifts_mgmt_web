export default interface CouponType {
    id?: number,
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