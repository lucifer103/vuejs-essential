import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    // 首页路由配置
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    // 其他未配置的路由都跳转到首页
    {
        path: '*',
        // 重定向
        redirect: '/'
    }
]

const router = new Router({
    mode: 'history',
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 获取仓库里的登录信息
    const auth = router.app.$options.store.state.auth

    if (auth && to.path.indexOf('/auth/') !== -1) {
        // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
        next('/')
    } else {
        next()
    }
})

export default router