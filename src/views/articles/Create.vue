<template>
    <div class="blog-container">
        <div class="blog-pages">
            <div class="col-sm-12 panel">
                <div class="panel-body">
                    <h2 class="text-center">{{ articleId ? '编辑文章' : '创作文章' }}</h2>
                    <hr>
                    <div data-validator-form>
                        <div class="form-group">
                            <input type="text" v-validator:blur.required="{ title: '标题' }" class="form-control" placeholder="请填写标题" v-model.trim="title" @input="saveTitle">
                        </div>
                        <div class="form-group">
                            <textarea name="" id="editor"></textarea>
                        </div>
                        <br>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit" @click="post">发 布</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'
    // 引入 highlight.js 的默认值
    import hljs from 'highlight.js'
    import ls from '@/utils/localStorage'

    // 添加全局变量
    window.hljs = hljs

    export default {
        name: 'Create',
        // 相关数据
        data() {
            return {
                title: '',   // 文章标题
                content: '',    // 文章内容
                articleId: undefined    // 文章 ID
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // 确认渲染组件对应的路由时，设置 articleId
                vm.setArticleId(vm.$route.params.articleId)
            })
        },
        // 在离开该组件的对应路由前
        beforeRouteLeave(to, from, next) {
            // 清空自动保存的文章数据
            this.clearData()
            next()
        },
        watch: {
            // 监听路由参数的变化
            '$route'(to) {
                // 清空自动保存的文章数据
                this.clearData()
                // 设置 articleId
                this.setArticleId(to.params.articleId)
            }
        },
        mounted() {
            // 创建一个 SimpleMDE 的实例
            // eslint-disable-next-line no-unused-vars
            const simplemde = new SimpleMDE({
                // 要绑定的 textarea 元素
                element: document.querySelector('#editor'),
                // 占位符
                placeholder: '请使用 Markdown 格式书写；-)，代码片段黏贴时请注意使用高亮语法',
                // 禁用拼写检查
                spellChecker: false,
                // 不用自动下载 FontAwesome，因为这个项目刚好有使用 FontAwesome，所以不用自动下载
                autoDownloadFontAwesome: false,
                // 启用自动保存，uniqueId 时一个用于区别其他站点的标识
                autosave: {
                    enabled: true,
                    uniqueId: 'vuejs-essential'
                },
                // 启用代码高亮，需要引入 highlight.js
                renderingConfig: {
                    codeSyntaxHighlighting: true
                }
            })

            // 监听编辑器的 change 事件
            simplemde.codemirror.on('change', () => {
                // 将改变后的值赋给文章内容
                this.content = simplemde.value()
            })

            // 将 simplemde 添加到当前实例，以在其他地方调用
            this.simplemde = simplemde
        },
        methods: {
            // 编辑器只会自动保存文章的内容，所以需要自己保存文章的标题
            saveTitle() {
                ls.setItem('smde_title', this.title)
            },
            // 填充文章数据
            fillContent(articleId) {
                // 编辑器
                const simplemde = this.simplemde
                // 自动保存的标题
                const smde_title = ls.getItem('smde_title')

                // 有 articleId 时
                if (articleId !== undefined) {
                    // 获取对应文章
                    const article = this.$store.getters.getArticleById(articleId)

                    if (article) {
                        // 获取文章的标题和内容
                        const { title, content } = article

                        // 有自动保存的标题时，使用自动保存的标题，否则使用文章的标题
                        this.title = smde_title || title
                        // 有自动保存的内容时，使用自动保存的内容，否则使用文章的内容
                        this.content = simplemde.value() || content
                        // 设置编辑器的内容
                        simplemde.value(this.content)
                    }
                } else {    // 没有 articleId 时，使用自动保存的文章和内容
                    this.title = smde_title
                    this.content = simplemde.value()
                }
            },
            // 发布
            post() {
                const title = this.title
                const content = this.content

                // 如果标题和内容都不为空，提交发布
                if (title !== '' && content.trim() !== '') {
                    // eslint-disable-next-line no-unused-vars
                    const article = {
                        title,
                        content
                    }
                    // 分发 post 事件，并附带参数 article 以及 articleId
                    this.$store.dispatch('post', { article, articleId: this.articleId })
                    // 清除数据
                    this.clearData()
                }
            },
            // 清除数据
            clearData() {
                this.title = ''
                ls.removeItem('smde_title')
                // 清除编辑器的内容
                this.simplemde.value('')
                // 清除编辑器自动保存的内容
                this.simplemde.clearAutosavedValue()
            },
            // 设置 articleId
            setArticleId(articleId) {
                // 获取 localStorage 保存的 articleId，临时用它来判断是否还处于当前编辑页面
                const localArticleId = ls.getItem('articleId')

                // 手动在两个不同的编辑页面之间跳转时（如：/articles/1/edit 和 /articles/2/edit）时
                if (articleId !== undefined && !(articleId === localArticleId)) {
                    // 清空自动保存的文章数据
                    this.clearData()
                }

                // 设置当前实例的 articleId
                this.articleId = articleId
                // 填充文章数据
                this.fillContent(articleId)
                // 在 localStorage 保存一个 articleId
                ls.setItem('articleId', articleId)
            }
        }
    }
</script>

<style scoped>
    .blog-container {
        max-width: 980px;
        margin: 20px auto 0;
    }
    textarea {
        height: 200px;
    }
</style>