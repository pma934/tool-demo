import Vue from 'vue'
import VueRouter from 'vue-router'
import pagedTableTest from '../views/paged-table-test.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'paged-table-test',
        component: pagedTableTest,
        // redirect: (to) => {
        //     console.log(`重定向自${to.name}`)
        //     return '/login'
        // }
    },
    {
        path: '/three',
        name: 'Three',
        component: () =>
            import('../views/Three.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('../views/Login.vue')
    },
    {
        path: '/uploadHead',
        name: 'UploadHead',
        component: () =>
            import('../views/UploadHead.vue')
    },
    {
        path: '/typing',
        name: 'Typing',
        component: () =>
            import('../views/Typing/Typing.vue')
    },
    {
        path: '/config',
        name: 'Config',
        component: () =>
            import('../views/createVideoConfig/index.vue')
    },
    {
        path: '/listenersTest',
        name: 'ListenersTest',
        component: () =>
            import('../views/listenersTest/index.vue')
    },
    {
        path: '/xlsxTest',
        name: 'xlsxTest',
        component: () =>
            import('../views/xlsxTest/xlsxTest.vue')
    },
    {
        path: '/cubeSugar',
        name: 'CubeSugar',
        component: () =>
            import('../views/CubeSugar/index.vue')
    }
]




const router = new VueRouter({
    routes
})

export default router