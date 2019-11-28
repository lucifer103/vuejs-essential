// 引入 vue.js 的默认值
import Vue from 'vue'
// 引入 App.vue 的默认值
import App from './App.vue'
// 如果引入的是 index.js，可以使用下面的简写，等价于 import router from './router/index.js'
import router from './router'
// 引入全局指令
import './directives'
// 引入全局消息组件
import './components'
// 引入 store/index.js 的默认值
import store from './store'
// 引入插件
import VueSweetalert from './plugins/vue-sweetalert'
import Message from './plugins/message'
import './filters'
import { mockArticles } from './mock/data'
import ls from './utils/localStorage'

// 使用插件
Vue.use(VueSweetalert)
Vue.use(Message)

// eslint-disable-next-line no-unused-vars
const AddMockData = (() => {
    // 是否加入测试数据
    const isAddMockData = true
    // 用户数据
    let userArticles = ls.getItem('articles')

    if (Array.isArray(userArticles)) {
        userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
    } else {
        userArticles = []
    }

    if (isAddMockData) {
        // 合并用户数据和测试数据，使用合并值作为所有文章
        store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(10)])
    } else {
        // 使用用户数据作为所有文章
        store.commit('UPDATE_ARTICLES', userArticles)
    }
})()

// 设置 false 以阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

// 创建一个新的 Vue 实例
new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
