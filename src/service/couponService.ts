import SubCoupon from "@/types/SubCoupon.ts";
import CouponType from "@/types/CouponType.ts";
import apiService from "@/service/api.ts";

export const couponService = {
    getMainCoupons: async (): Promise<CouponType[]> => {
        const response = await apiService.get<CouponType[]>('/coupons/main');
        return response.data;
    },
    getSubCoupons: async (couponTypeId: string): Promise<SubCoupon[]> => {
        const response = await apiService.get<SubCoupon[]>(`/coupons/sub/${couponTypeId}`);
        return response.data;
    },

    updateMainCoupon: async (couponData: CouponType): Promise<CouponType> => {
        const response = await apiService.put<CouponType>(`/coupons/main/${couponData.id}`, couponData);
        return response.data;
    },

    updateSubCoupon: async (couponData: SubCoupon): Promise<SubCoupon> => {
        const response = await apiService.put<SubCoupon>(`/coupons/sub/${couponData.id}`, couponData);
        return response.data;
    },

    deleteMainCoupon: async (id: number): Promise<void> => {
        await apiService.delete(`/coupons/main/${id}`);
    },

    deleteSubCoupon: async (id: number): Promise<void> => {
        await apiService.delete(`/coupons/sub/${id}`);
    },

    createMainCoupon: async (couponData: Omit<CouponType, 'id'>): Promise<CouponType> => {
        const response = await apiService.post<CouponType>('/coupons/main', couponData);
        return response.data;
    },

    createSubCoupon: async (couponData: Omit<SubCoupon, 'id'>): Promise<SubCoupon> => {
        const response = await apiService.post<SubCoupon>('/coupons/sub', couponData);
        return response.data;
    },
}