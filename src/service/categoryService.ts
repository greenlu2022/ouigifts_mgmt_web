import Category from "@/types/Category.ts";
import apiService from "@/service/api.ts";


export const categoryService = {
    getCategories: async (): Promise<Category[]> => {
        const response = await apiService.get<Category[]>('/categories');
        return response.data;
    },
    createCategory: async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
        const response = await apiService.post<Category>('/categories', categoryData);
        return response.data;
    },
    updateCategory: async (categoryData: Category): Promise<Category> => {
        const response = await apiService.put<Category>(`/categories/${categoryData.id}`, categoryData);
        return response.data;
    },
    deleteCategory: async (id: number): Promise<void> => {
        await apiService.delete(`/categories/${id}`);
    },
}