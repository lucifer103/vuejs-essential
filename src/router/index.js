import Vue from 'vue'
import Router from 'vue-router'
// 引入 ./routes.js 的默认值
import routes from './routes'

/**
 * 重写路由的push方法
 * 避免在路由中添加相同路由的报错
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
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