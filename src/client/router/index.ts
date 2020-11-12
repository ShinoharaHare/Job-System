import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/page1',
        name: 'Page1',
        meta: { title: 'Page1 | Job System' },
        component: () => import('@/client/views/Page1.vue')
    },
    {
        path: '/page2',
        name: 'Page2',
        meta: { title: 'Page2 | Job System' },
        component: () => import('@/client/views/Page2.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router
