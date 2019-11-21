export default [
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
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    // EditUsers
    {
        path: '/users/1/edit',
        name: 'EditUsers',
        component: () => import('@/views/users/Edit.vue')
    }
]