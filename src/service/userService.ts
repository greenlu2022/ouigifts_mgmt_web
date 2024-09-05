import apiService from "@/service/api.ts";

interface User {
    id: number;
    name: string;
    email: string;
}

export const userService = {
    getUsers: async (): Promise<User[]> => {
        const response = await apiService.get<User[]>('/users');
        return response.data;
    },

    getUser: async (id: number): Promise<User> => {
        const response = await apiService.get<User>(`/users/${id}`);
        return response.data;
    },

    createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
        const response = await apiService.post<User>('/users', userData);
        return response.data;
    },

    updateUser: async (userData: User): Promise<User> => {
        const response = await apiService.put<User>(`/users/${userData.id}`, userData);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await apiService.delete(`/users/${id}`);
    },

};