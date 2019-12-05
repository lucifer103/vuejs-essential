import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
// 引入 actions.js 的所有导出
import * as moreActions from './actions'
import * as moreGetters from './getters'

Vue.use(Vuex)

const state = {
    // 用户信息，初始值从本地 localStorage 获取
    user: ls.getItem('user'),
    // auth 来保存当前用户的登录状态
    auth: ls.getItem('auth'),
    // 所有文章状态
    articles: ls.getItem('articles'),
    // 搜索值
    searchValue: '',
    // 默认为 location.origin
    origin: location.origin.indexOf('github.io') !== -1 ? `${location.origin}/vuejs-essential/dist` : location.origin
}

const mutations = {
    UPDATE_USER(state, user) {
        // 改变 user 的值
        state.user = user
        // 将改变后的值存入 localStorage
        ls.setItem('user', user)
    },
    // UPDATE_AUTH 来改变当前用户的登录状态
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    },
    // 更改所有文章的事件类型
    UPDATE_ARTICLES(state, articles) {
        state.articles = articles
        ls.setItem('articles', articles)
    },
    // 更新搜索值的事件类型
    UPDATE_SEARCH_VALUE(state, searchValue) {
        state.searchValue = searchValue
    }
}

const actions = {
    login({ commit }, user) {
        // 登录时有传用户信息，就更新下用户信息
        if (user) {
            commit('UPDATE_USER', user)
        }
        // 更新当前用户的登录状态为已登录
        commit('UPDATE_AUTH', true)
        // 跳转到首页
        router.push('/')
    },
    logout({ commit }) {
        commit('UPDATE_AUTH', false)
        router.push({
            name: 'Home',
            params: {
                logout: true
            }
        })
    },
    // 更新个人信息
    updateUser({ state, commit }, user) {
        // 获取仓库的个人信息
        const stateUser = state.user

        // 简单的数据类型判断
        if (stateUser && typeof stateUser === 'object') {
            // 合并新旧个人信息，等价于 user = Object.assign({}, stateUser, user)
            user = { ...stateUser, ...user }
        }

        // 更新个人信息
        commit('UPDATE_USER', user)
    },
    // 使用对象展开运算符混入 moreActions
    // 等价于：const actions = Object.assign(actions, moreActions)
    ...moreActions
}

const getters = {
    // 第一参数是 state，因为要传 id，所以这里返回一个函数
    // eslint-disable-next-line no-unused-vars
    getArticleById: (state, getters) => (id) => {
        // 使用派生状态 computedArticles 作为所有文章
        let articles = getters.computedArticles

        // 所有文章是一个数组时
        if (Array.isArray(articles)) {
            // 传进来的 id 和文章的 articleId 相同时，返回这些文章
            articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
            // 根据文章长度，返回文章或者 null
            return articles.length ? articles[0] : null
        } else {
            // 返回 null
            return null
        }
    },
    // 混入 moreGetters，可以理解为 getters = Object.assign(getters, moreGetters)
    ...moreGetters
}

const store = new Vuex.Store({
    state,
    // 注册 getters
    getters,
    mutations,
    actions
})

export default store