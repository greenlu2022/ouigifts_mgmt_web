import Banner from "@/types/Banner.ts";
import apiService from "@/service/api.ts";

export const bannerService = {
    getBanners: async (): Promise<Banner[]> => {
        const response = await apiService.get<Banner[]>('/banners');
        return response.data;
    },
    createBanner: async (bannerData: Omit<Banner, 'id'>): Promise<Banner> => {
        const response = await apiService.post<Banner>('/banner', bannerData);
        return response.data;
    },
    updateBanner: async (bannerData: Banner): Promise<Banner> => {
        const response = await apiService.put<Banner>(`/banner/${bannerData.id}`, bannerData);
        return response.data;
    },
    deleteBanner: async (id: number): Promise<void> => {
        await apiService.delete(`/banner/${id}`);
    },
}