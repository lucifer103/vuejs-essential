import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'
// 引入 title.js 的默认值
import title from './title'

const directives = {
    validator,
    dropdown,
    // 添加 title 以便在循环中进行注册
    title
}

/**
 * Object.entries 返回给定对象的键值对数组，以 Object.entries(directives) 的返回为例：
 * [['validator', {...}], ['dropdown', {...}]]
 */
for (const [key, value] of Object.entries(directives)) {
    Vue.directive(key, value)
}