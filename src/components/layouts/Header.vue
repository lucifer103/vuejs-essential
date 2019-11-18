<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <a href="/" class="navbar-brand">
                    <span class="title">{{ logo.title }}</span>
                    <img :src="logo.src" :alt="logo.title">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                logo: {
                    // src 的值是用反引号（`）标识的模板字符串，我们只需将变量放在 ${} 的大括号之中
                    src: `${this.uploadsUrl}/communities/hIZjRRdF8oVYZy69XJnT.png`,
                    title: 'VuejsCaff'
                },
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
</style>