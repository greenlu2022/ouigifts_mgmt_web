import {createRouter, createWebHistory} from 'vue-router'
import {isLoginAuthenticated} from "@/helpers/authenticate.ts";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                component: () => import('@/layout/default.vue'),
                meta: {requiresAuth: true},
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

router.beforeEach(function (to, _, next) {
    const isAuthenticated = isLoginAuthenticated() // get isAuthenticated from cookie or local storage

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Route requires authentication
        if (isAuthenticated) {
            // User is authenticated, proceed to the route
            next()
        } else {
            // User is not authenticated, redirect to login page
            next('/login')
        }
    } else {
        // Route does not require authentication
        next()
    }
})

export default router