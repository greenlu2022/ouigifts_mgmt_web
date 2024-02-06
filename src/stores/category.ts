import {defineStore} from 'pinia'
import type Category from "@/types/Category.ts";

export const useCategoryStore = defineStore('category', {
    state: (): {
        categories: Category[]
    } => ({categories: []}),
    getters: {},
    actions: {
        getCatefories() {
            const apiCategories: Category[] = [
                {
                    id: 1,
                    name: 'Fashion',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    isEnabled: true,
                },
                {
                    id: 2,
                    name: 'Food & Drink',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    isEnabled: true,
                },
                {
                    id: 3,
                    name: 'Beauty & SPA',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    isEnabled: true,
                },
                {
                    id: 4,
                    name: 'Travel',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    isEnabled: true,
                },
                {
                    id: 5,
                    name: 'Electronics',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    isEnabled: true,
                },
                {
                    id: 6,
                    name: 'Entertainment',
                    imageUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    isEnabled: true,
                }
            ]
            if (this.categories.length > 0) {
                this.clear()
            }
            apiCategories.forEach(category => {
                this.add(category)
            })
        },
        add(category: Category) {
            this.categories.push(category)
        },
        addFirst(category: Category) {
            this.categories.unshift(category)
        },
        update(category: Category): void {
            const bannerIndex = this.categories.findIndex(item => item.id == category.id)
            this.categories.splice(bannerIndex, 1, category)
        },
        remove(categoryId: number): void {
            const categoryIndex = this.categories.findIndex(item => item.id == categoryId)
            this.categories.splice(categoryIndex, 1)
        },
        clear() {
            this.categories = []
        }
    },
})