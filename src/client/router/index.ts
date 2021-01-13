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
        path: '/job/new',
        name: 'NewJob',
        component: () => import('@/client/views/NewJob.vue')
    },
    {
        path: '/job/:id',
        name: 'Job',
        component: () => import('@/client/views/Job.vue')
    },
    {
        path: '/job/:id/edit',
        name: 'EditJob',
        component: () => import('@/client/views/EditJob.vue')
    },
    {
        path: '/job/:id/apply',
        name: 'ApplyJob',
        component: () => import('@/client/views/ApplyJob.vue')
    },
    {
        path: '/job/:id/applicant',
        name: 'Applicant',
        component: () => import('@/client/views/Applicant.vue')
    },
    {
        path: '/applyment/:id',
        name: 'Applyment',
        component: () => import('@/client/views/Applyment.vue')
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
        path: '/resume',
        name: 'Resume',
        component: () => import('@/client/views/Resume.vue')
    },
    {
        path: '/resume/new',
        name: 'NewResume',
        component: () => import('@/client/views/NewResume.vue')
    },
    {
        path: '/resume/:id/edit',
        name: 'EditResume',
        component: () => import('@/client/views/EditResume.vue')
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
    },
    {
        path: '/resetpassword/:email',
        name: 'ResetPassword',
        component: () => import('@/client/views/ResetPassword.vue')
    }
    
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
