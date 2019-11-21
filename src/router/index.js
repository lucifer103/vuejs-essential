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
    const app = router.app
    const store = app.$options.store
    // 获取仓库里的登录信息
    const auth = store.state.auth

    // 隐藏消息提示
    app.$message.hide()

    if (
        // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
        (auth && to.path.indexOf('/auth/') !== -1) ||
        // 当用户没登陆且目标页面要求登录时，跳转到首页
        (!auth && to.meta.auth)
    ) {
        next('/')
    } else {
        next()
    }
})

export default router