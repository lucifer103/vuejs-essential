<template>
    <div class="blog-container" style="margin-top: 20px;">
        <div class="blog-pages">
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

    export default {
        name: 'Content',
        // 相关数据
        data() {
            return {
                title: '',  // 文章标题
                content: '',    // 文章内容
                date: ''    // 创建时间
            }
        },
        // 在实例创建完成后
        created() {
            // 从当前路由对象获取参数 articleId
            const articleId = this.$route.params.articleId
            // 从 getArticleById 返回指定 ID 的文章
            const article = this.$store.getters.getArticleById(articleId)

            if (article) {
                // 获取文章中的标题，内容以及日期
                let { title, content, date } = article

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
        }
    }
</script>

<style scoped>

</style>