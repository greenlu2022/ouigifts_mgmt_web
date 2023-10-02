import { defineStore } from 'pinia'


type Banner = {
    name: string;
};

export const useBannerStore = defineStore('banner', {
    state: ():{ banners: any[] } => ({banners: []}),
    getters: {},
    actions: {
        addBanner(banner: Banner){
            this.banners.push(banner)
        }
    },
})