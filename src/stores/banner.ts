import {defineStore} from 'pinia'

type Banner = {
    id: number,
    name: string,
    imageUrl: string,
    directUrl: string,
    actionType: string,
    startTime: string,
    endTime: string
    isActive: boolean,
};

export const useBannerStore = defineStore('banner', {
    state: (): { banners: any[] } => ({banners: []}),
    getters: {},
    actions: {
        getBanners() {
            const apiBanners: Banner[] = [
                {
                    id: 1,
                    name: 'Daoori',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: '',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isActive: true,
                },
                {
                    id: 2,
                    name: 'Apple',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: '',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isActive: true,
                },
                {
                    id: 3,
                    name: 'Google',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: '',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isActive: true,
                }
            ]
            if (this.banners.length > 0) {
                this.clearBanners()
            }
            apiBanners.forEach(banner => {
                this.addBanner(banner)
            })
        },
        addBanner(banner: Banner) {
            this.banners.push(banner)
        },
        clearBanners() {
            this.banners = []
        }
    },
})