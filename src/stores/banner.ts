import {defineStore} from 'pinia'
import type Banner from "../types/Banner.ts";
import type {ID} from "@/types/utilsType.ts";
import banners from "@/mockData/banners.ts";

export const useBannerStore = defineStore('banner', {
    state: (): {
        banners: Banner[]
    } => ({banners: []}),
    getters: {},
    actions: {
        getBanners() {
            const apiBanners: Banner[] = banners
            if (this.banners.length > 0) {
                this.clear()
            }
            apiBanners.forEach(banner => {
                this.add(banner)
            })
        },
        add(banner: Banner) {
            this.banners.push(banner)
        },
        addUnshift(banner: Banner) {
            this.banners.unshift(banner)
        },
        update(banner: Banner): void {
            const bannerIndex = this.banners.findIndex(item => item.id == banner.id)
            this.banners.splice(bannerIndex, 1, banner)
        },
        remove(bannerId: ID): void {
            const bannerIndex = this.banners.findIndex(item => item.id == bannerId)
            this.banners.splice(bannerIndex, 1)
        },
        clear() {
            this.banners = []
        }
    },
})