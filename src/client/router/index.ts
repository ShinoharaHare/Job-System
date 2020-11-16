import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        meta: { title: '主頁 | Job System' },
        component: () => import('@/client/views/Home.vue')
    },
    {
        path: '/favorites',
        name: 'Favorites',
        meta: { title: '收藏 | Job System' },
        component: () => import('@/client/views/Favorites.vue')
    },
    {
        path: '/notification',
        name: 'Notification',
        meta: { title: '通知 | Job System' },
        component: () => import('@/client/views/Notification.vue')
    },
    {
        path: '/personal',
        name: 'Personal',
        meta: { title: '個人 | Job System' },
        component: () => import('@/client/views/Personal.vue')
    },
    {
        path: '/job',
        name: 'Job',
        component: () => import('@/client/views/Job.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
