import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

const state = {
    // 用户信息，初始值从本地 localStorage 获取
    user: ls.getItem('user'),
    // auth 来保存当前用户的登录状态
    auth: ls.getItem('auth')
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
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store