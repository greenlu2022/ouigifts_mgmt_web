export default interface CouponType {
    id?: number,
    categoryIds?: string[],
    name?: string,
    codeName?: string,
    isLimited?: boolean,
    availableArea?: string[],
    availableAmount?: number,
    restriction?: string[],
    startTime?: string,
    endTime?: string,
    imageUrl?: string,
    isEnabled?: boolean,
}