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

// 设置 false 以阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

// 创建一个新的 Vue 实例
new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
