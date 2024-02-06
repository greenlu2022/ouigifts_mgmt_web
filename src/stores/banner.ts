import {defineStore} from 'pinia'
import type Banner from "../types/Banner.ts";

export const useBannerStore = defineStore('banner', {
    state: (): {
        banners: Banner[]
    } => ({banners: []}),
    getters: {},
    actions: {
        getBanners() {
            const apiBanners: Banner[] = [
                {
                    id: 1,
                    name: 'Daoori',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: 'https://daoori.com/',
                    actionType: 'inner route',
                    startTime: '2023-12-31 00:00:00',
                    endTime: '2024-12-31 23:59:59',
                    isEnabled: true,
                },
                {
                    id: 2,
                    name: 'Apple',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: 'https://daoori.com/',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isEnabled: true,
                },
                {
                    id: 3,
                    name: 'Google',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: 'https://daoori.com/',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isEnabled: true,
                },
                {
                    id: 4,
                    name: 'Google',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: 'https://daoori.com/',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isEnabled: true,
                },
                {
                    id: 5,
                    name: 'Google',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: 'https://daoori.com/',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isEnabled: true,
                },
                {
                    id: 6,
                    name: 'Google',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    directUrl: 'https://daoori.com/',
                    actionType: 'inner route',
                    startTime: '2023-12-31',
                    endTime: '2024-12-31',
                    isEnabled: true,
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
        addBannerUnshift(banner: Banner) {
            this.banners.unshift(banner)
        },
        updateBanner(banner: Banner): void {
            const bannerIndex = this.banners.findIndex(item => item.id == banner.id)
            this.banners.splice(bannerIndex, 1, banner)
        },
        removeBanner(bannerId: number): void {
            const bannerIndex = this.banners.findIndex(item => item.id == bannerId)
            this.banners.splice(bannerIndex, 1)
        },
        clearBanners() {
            this.banners = []
        }
    },
})