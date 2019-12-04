<template>
    <div>
        <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

        <!-- 帖子列表 -->
        <div class="col-md-9 topics-index main-col">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <ul class="list-inline topic-filter">
                        <li v-for="item in filters" :key="item.filter">
                            <router-link v-title="item.title" :class="{ active: filter === item.filter }" :to="`/topics?filter=${item.filter}`">{{ item.name }}</router-link>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>

                <div class="panel-body remove-padding-horizontal">
                    <ul class="list-group row topic-list">
                        <li v-for="article in articles" :key="article.articleId" class="list-group-item">
                            <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                                <div class="count_set">
                                    <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                                    <span class="count_seperator"> / </span>
                                    <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                                    <span class="count-seperator"> | </span>
                                    <abbr title="" class="timeago">{{ article.date | moment('from') }}</abbr>
                                </div>
                            </router-link>
                            <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
                                <img :src="article.uavatar" alt="" class="media-object img-thumbnail avatar avatar-middle">
                            </router-link>
                            <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                                <div class="media-heading">
                                    {{ article.title }}
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Home',
        data() {
            return {
                msg: '',    // 消息
                msgType: '',    // 消息类型
                msgShow: false,  // 是否显示消息，默认不显示
                articles: [],   // 文章列表
                filter: 'default',  // 默认过滤方式
                filters: [  // 过滤方式列表
                    { filter: 'default', 'name': '活跃', title: '最后回复排序'},
                    { filter: 'excellent', name: '精华', title: '只看加精的话题'},
                    { filter: 'vote', name: '投票', title: '点赞数排序'},
                    { filter: 'recent', name: '最近', title: '发布时间排序'},
                    { filter: 'noreply', name: '零回复', title: '无人问津的话题'}
                ],
            }
        },
        // 组件内的路由导航守卫
        beforeRouteEnter(to, from, next) {
            // 路由的名称，对应路由配置中的 name
            const fromName = from.name
            // 获取 logout 参数
            const logout = to.params.logout

            // 确认导航
            next(vm => {
                // 通过 vm 参数访问组件实例，已登录时，评估路由名称
                if (vm.$store.state.auth) {
                    switch(fromName) {
                        // 如果从注册页面跳转过来
                        case 'Register':
                            // 显示注册成功
                            vm.showMsg('注册成功')
                            break;
                        // 已登录时，从登录页面跳转过来
                        case 'Login':
                            // 显示登录成功
                            vm.showMsg('登录成功')
                            break;
                    }
                } else if (logout) {
                    // logout 返回 true 时，显示操作成功提示
                    vm.showMsg('操作成功')
                }

                // 确认渲染该组件的对应路由时，设置相关数据
                vm.setDataByFilter(to.query.filter)
            })
        },
        computed: {
            ...mapState([
                'auth',
                'user'
            ])
        },
        watch: {
            // 监听 auth，它的值变为 false 时，显示操作成功提示
            auth(value) {
                if (!value) {
                    this.showMsg('操作成功')
                }
            },
            '$route'(to) {
                this.setDataByFilter(to.query.filter)
            }
        },
        methods: {
            showMsg(msg, type = 'success') {
                this.msg = msg
                this.msgType = type
                this.msgShow = true
            },
            // 设置相关数据
            setDataByFilter(filter = 'default') {
                // 设置当前过滤方式为查询参数的 filter
                this.filter = filter
                // 设置文章列表为过滤后的所有文章
                this.articles = this.$store.getters.getArticlesByFilter(filter)
            }
        }
    }
</script>

<style scoped>

</style>