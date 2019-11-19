<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" @click="toggleNav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <router-link to="/" class="navbar-brand">
                    <span class="title">{{ logo.title }}</span>
                    <img :src="logo.src" :alt="logo.title">
                </router-link>
            </div>

            <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', {in: showCollapsedNav }]">
                <ul class="nav navbar-nav">
                    <li v-for="(item, index) in navList" :key="item" :class="{ active: index === activeNavIndex }">
                        <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
                    </li>
                </ul>

                <!-- 入口组件 -->
                <div class="navbar-right">
                    <Entry/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Entry from '@/components/layouts/Entry'

    export default {
        name: 'Header',
        // 添加 components 选项，并注册 Entry
        components: {
            Entry
        },
        data() {
            return {
                logo: {
                    // src 的值是用反引号（`）标识的模板字符串，我们只需将变量放在 ${} 的大括号之中
                    src: `${this.uploadsUrl}/communities/hIZjRRdF8oVYZy69XJnT.png`,
                    title: 'VuejsCaff'
                },
                navList: ['社区', '头条', '问答', '教程'],
                activeNavIndex: 0,
                showCollapsedNav: false
            }
        },
        /**
         * 等价于以下写法
         * beforeCreate: function beforeCreate() {
         *     this.uploadsUrl = 'https://cdn.learnku.com/uploads/
         * }
         */
        beforeCreate() {
            // 在当前实例上添加一个 uploadsUrl 属性
            this.uploadsUrl = 'https://cdn.learnku.com/uploads'
        },
        methods: {
            changeNavIndex(index) {
                this.activeNavIndex = index
            },
            toggleNav() {
                this.showCollapsedNav = !this.showCollapsedNav
            }
        }
    }
</script>

<!-- scoped 说明样式只在当前组件中起作用 -->
<style scoped>
    .title {
        line-height: 26px;
    }

    .navbar-default .navbar-nav > .active > a {
        background: rgba(0, 0, 0, .03);
    }
</style>