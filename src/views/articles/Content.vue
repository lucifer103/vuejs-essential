<template>
    <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
            <h1 class="text-center">{{ title }}</h1>
            <div class="article-meta text-center">
                <i class="fa fa-clock-o"></i>
                <abbr title="">{{ date | moment('from') }}</abbr>
            </div>
            <div class="entry-content">
                <div class="content-body entry-content panel-body">
                    <div class="markdown-body" v-html="content"></div>
                    <!-- 编辑删除图标 -->
                    <div v-if="auth && uid === 1" class="panel-footer operate">
                        <div class="actions">
                            <a href="javascript:;" @click="deleteArticle" class="admin"><i class="fa fa-trash-o"></i></a>
                            <a href="javascript:;" @click="editArticle" class="admin"><i class="fa fa-pencil-square-o"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'
    import hljs from 'highlight.js'
    import emoji from 'node-emoji'
    // 引入 mapState 辅助函数
    import { mapState } from 'vuex'

    export default {
        name: 'Content',
        // 相关数据
        data() {
            return {
                title: '',  // 文章标题
                content: '',    // 文章内容
                date: '',   // 创建时间
                uid: 1  // 用户 ID
            }
        },
        // 计算属性
        computed: {
            // 将仓库的以下状态混入到计算属性之中
            ...mapState([
                'auth',
                'user'
            ])
        },
        // 在实例创建完成后
        created() {
            // 从当前路由对象获取参数 articleId
            const articleId = this.$route.params.articleId
            // 从 getArticleById 返回指定 ID 的文章
            const article = this.$store.getters.getArticleById(articleId)

            if (article) {
                // 获取文章中的用户 ID、标题、内容以及日期
                let { uid, title, content, date } = article

                // 设置实例的 uid
                this.uid = uid
                this.title = title
                // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
                // 先使用 emojify 方法解析 emoji 字符串标识，name => name 标识不认识的就返回原值
                this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name, name => name))
                // 设置当前实例的 date
                this.date = date

                this.$nextTick(() => {
                    // 遍历当前时立下的 `pre code` 元素
                    this.$el.querySelectorAll('pre code').forEach((el) => {
                        // 使用 highlight.js 的 highlightBlock 方法进行高亮
                        hljs.highlightBlock(el)
                    })
                })
            }

            // 设置实例的 articleId
            this.articleId = articleId
        },
        methods: {
            // 编辑文章
            editArticle() {
                // 点击编辑文章图标，跳到编辑文章页面，并附带当前文章 ID
                this.$router.push({ name: 'Edit', params: { articleId: this.articleId } })
            },
            // 删除文章
            deleteArticle() {
                this.$swal({
                    text: '你确定要删除此内容吗？',
                    buttons: ['取消', '删除']
                }).then((value) => {
                    if (value) {
                        this.$store.dispatch('post', { articleId: this.articleId })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>