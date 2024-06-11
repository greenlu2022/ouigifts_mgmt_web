import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                component: () => import('@/layout/default.vue'),
                children: [
                    {
                        path: 'dashboard',
                        component: () => import('@/pages/Dashboard.vue'),
                    },
                    {
                        path: 'banner',
                        component: () => import('@/pages/Banner.vue'),
                    },
                    {
                        path: 'account',
                        component: () => import('@/pages/Account.vue'),
                    },
                    {
                        path: 'category',
                        component: () => import('@/pages/Category.vue'),
                    },
                    {
                        path: 'coupon',
                        component: () => import('@/pages/Coupon.vue'),
                    },
                ],
            },
            {
                path: '/login',
                component: () => import('@/layout/blank.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('@/pages/Login.vue'),
                    }
                ]
            }
        ]
    }
)

export default router