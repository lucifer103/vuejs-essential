<template>
    <div class="navbar-right">
        <!-- 已登录，显示用户信息 -->
        <ul v-if="auth" class="nav navbar-nav github-login">
            <li>
                <a href="javascript:;" v-dropdown>
                    <span v-if="user">
                        <img v-if="user.avatar" :src="user.avatar" class="avatar-topnav">
                        <span v-if="user.name">{{ user.name }}</span>
                    </span>
                    <span v-else>佚名</span>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="javascript:;" @click="logout"><i class="fa fa-sign-out text-md"></i>退出</a></li>
                </ul>
            </li>
        </ul>
        <!-- 未登录，显示登录注册 -->
        <div v-else class="nav navbar-nav github-login">
            <router-link to="/auth/login" class="btn btn-default login-btn">
                <i class="fa fa-user"></i> 登录
            </router-link>
            <router-link to="/auth/register" class="btn btn-default login-btn">
                <i class="fa fa-user-plus"></i> 注 册
            </router-link>
        </div>
    </div>
</template>

<script>
    // 引入 mspState 辅助函数
    import { mapState } from 'vuex'

    export default {
        name: 'Entry',
        // 添加计算属性选项
        computed: {
            // 使用对象展开运算符，将 mapState 对象混入到计算属性之中
            ...mapState([
                // 映射 this.auth 为 store.state.auth
                'auth',
                // 映射 this.user 为 store.state.user
                'user'
            ])
        },
        // 添加 methods 选项，并添加 logout 方法
        methods: {
            logout() {
                this.$swal({
                    text: '你确定要退出吗？',
                    buttons: ['取消', '退出']
                }).then((value) => {
                    if (value) {
                        this.$store.dispatch('logout')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>