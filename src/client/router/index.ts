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
        path: '/favorite',
        name: 'Favorite',
        meta: { title: '收藏 | Job System' },
        component: () => import('@/client/views/Favorite.vue')
    },
    {
        path: '/notification',
        name: 'Notification',
        meta: { title: '通知 | Job System' },
        component: () => import('@/client/views/Notification.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        meta: { title: '設定 | Job System' },
        component: () => import('@/client/views/Setting.vue')
    },
    {
        path: '/job/:id',
        name: 'Job',
        component: () => import('@/client/views/Job.vue')
    },
    {
        path: '/published',
        name: 'Published',
        component: () => import('@/client/views/Published.vue')
    },
    {
        path: '/applied',
        name: 'Applied',
        component: () => import('@/client/views/Applied.vue')
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/client/views/Statistics.vue')
    },
    {
        path: '/link-ntou',
        name: 'LinkNTOU',
        component: () => import('@/client/views/LinkNTOU.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/client/views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/client/views/Register.vue')
    },
    {
        path: '/timetable',
        name: 'Timetable',
        component: () => import('@/client/views/Timetable.vue')
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/client/views/Personal.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
