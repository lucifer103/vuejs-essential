<template>
    <div class="col-md-3 side-bar">
        <div class="panel panel-default corner-radius sidebar-resources">
            <div class="panel-heading text-center">
                <h3 class="panel-title">实战课程</h3>
            </div>
            <div class="panel-body">
                <Slider :slides="slides">
                    <template slot-scope="{ currentSlide }">
                        <a :href="currentSlide.link" target="_blank">
                            <img :src="currentSlide.img" :alt="currentSlide.title" :title="currentSlide.title">
                        </a>
                    </template>
                </Slider>
            </div>
        </div>

        <!-- 活跃用户 -->
        <div class="panel panel-default corner-radius panel-active-users">
            <div class="panel-heading text-center">
                <h3 class="panel-title">活跃用户</h3>
            </div>
            <div class="panel-body">
                <div class="users-label">
                    <router-link v-for="(user, index) in activeUsers" :key="index" :to="`/${user.name}`" class="users-label-item">
                        <img :src="user.avatar" alt="" class="avatar-small inline-block">
                        {{ user.name }}
                    </router-link>
                </div>
            </div>
        </div>

        <!-- 七天内最热 -->
        <div class="panel panel-default corner-radius panel-hot-topics">
            <div class="panel-heading text-center">
                <h3 class="panel-title">七天内最热</h3>
            </div>
            <div class="panel-body">
                <ul class="list">
                    <li v-for="(article, index) in hotArticles" :key="index">
                        <router-link :to="`/articles/${article.articleId}/content`">
                            <span v-if="index === 0">🏆</span>
                            <span v-else>{{ index + 1 }}.</span>
                            {{ article.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 其他内容 -->
        <div class="other">
            <div class="panel panel-default corner-radius sidebar-resources">
                <div class="panel-heading text-center">
                    <h3 class="panel-title">推荐资源</h3>
                </div>
                <div class="panel-body">
                    <ul class="list list-group">
                        <li v-for="(item, index) in resources" :key="index" class="list-group-item">
                            <a :href="item.link" target="_blank">
                                <img src="https://cdn.learnku.com/uploads/sites/fcxJFYjEMaLQt4Oi1x6ZNkcqvwIVHbfy.png" alt="" class="media-object inline-block">
                                {{ item.title }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="panel panel-default corner-radius">
                <div class="panel-body text-center">
                    <a href="mailto:hug.m@foxmail.com" style="color: #a5a5a5">
                        <span style="margin-top: 7px; display: inline-block;">
                            <i class="fa fa-heard" style="color: rgba(232, 146, 136, 0.89);"></i>
                            建议反馈？请私信翟宇鑫
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data() {
            return {
                // 实战课程
                slides: [
                    {
                        title: '《L01 Laravel 教程 - Web 开发实战入门》',
                        img: 'https://cdn.learnku.com/uploads/images/201810/26/1/MYg2QNQfss.png',
                        link: 'https://learnku.com/courses/laravel-essential-training'
                    },
                    {
                        title: '《L02 Laravel 教程 - Web 开发实战进阶》',
                        img: 'https://cdn.learnku.com/uploads/images/201810/26/1/Eya5MlZCuH.png',
                        link: 'https://learnku.com/courses/laravel-intermediate-training'
                    },
                    {
                        title: '《L03 Laravel 教程 - 实战构架 API 服务器》',
                        img: 'https://cdn.learnku.com/uploads/images/201810/26/1/LEJyMUoXVQ.png',
                        link: 'https://learnku.com/courses/laravel-advance-training'
                    },
                    {
                        title: '《L04 Laravel 教程 - 微信小程序从零到发布》',
                        img: 'https://cdn.learnku.com/uploads/images/201810/26/1/YtwiopnTgn.png',
                        link: 'https://learnku.com/courses/laravel-weapp'
                    },
                    {
                        title: '《L05 Laravel 教程 - 电商实战》',
                        img: 'https://cdn.learnku.com/uploads/images/201810/26/1/mj8qSkmZzw.png',
                        link: 'https://learnku.com/courses/laravel-shop'
                    },
                    {
                        title: '《L06 Laravel 教程 - 电商进阶》',
                        img: 'https://cdn.learnku.com/uploads/images/201810/26/1/lto59p5rEM.png',
                        link: 'https://learnku.com/courses/ecommerce-advance'
                    },
                    {
                        title: '《LX1 Laravel / PHP 扩展包视频教程》',
                        img: 'https://cdn.learnku.com/uploads/images/201808/06/1/S5h9WvQSk4.png',
                        link: 'https://learnku.com/courses/laravel-package'
                    },
                    {
                        title: '《LX2 PHP 扩展包实战教程 - 从入门到发布》',
                        img: 'https://cdn.learnku.com/uploads/images/201807/23/1/NCEii0F1bc.png!/both/400x400',
                        link: 'https://learnku.com/courses/creating-package'
                    },
                    {
                        title: '《LX3 Laravel 性能优化入门》',
                        img: 'https://cdn.learnku.com/uploads/images/201906/17/1/rIC2Vg4qYB.jpg!/both/400x400',
                        link: 'https://learnku.com/courses/laravel-performance'
                    },
                    {
                        title: '《V01 Vue.js 实战教程 - 基础篇》',
                        img: 'https://cdn.learnku.com/uploads/images/201901/29/1/I2x4n8kWIB.png',
                        link: 'https://learnku.com/courses/vuejs-essential'
                    }
                ],
                activeUsers: [],    // 活跃用户
                hotArticles: [],
                // 推荐资源
                resources: [
                    {
                        title: 'Vue 官方教程',
                        link: 'https://vuejscaff.com/v2/guide/',
                    },
                    {
                        title: 'Vuex 官方教程',
                        link: 'https://vuex.vuejs.org/zh/',
                    },
                    {
                        title: 'Vue Router 官方教程',
                        link: 'https://router.vuejs.org/zh-cn/',
                    },
                    {
                        title: 'Vue Loader 官方教程',
                        link: 'https://vue-loader.vuejs.org/zh-cn/',
                    },
                    {
                        title: 'Vue 特有代码的风格指南',
                        link: 'https://vuejscaff.com/v2/style-guide/',
                    }
                ]
            }
        },
        // 在实例创建完成后
        created() {
            // 通过 axios 执行 GET 请求来返回活跃用户
            this.$axios.get('/users/active').then((response) => {
                // 在成功的回调里，从 response.data 获取返回数据
                this.activeUsers = response.data
            })

            // 通过 axios 执行 POST 请求来返回七天内最热文章，可以传递 num 来指定返回条数
            this.$axios.post('/articles/hot', { num: 10 }).then((response) => {
                this.hotArticles = response.data
            })
        }
    }
</script>

<style scoped>
    .carousel-inner img {
        display: block;
        margin: auto;
        line-height: 1;
        width: 70%;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px #ccc;
        -moz-box-shadow: 0 0 10px #ccc;
        -webkit-box-shadow: 0 0 10px #ccc;
    }
</style>