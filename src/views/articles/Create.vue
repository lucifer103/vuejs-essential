<template>
    <div class="blog-container">
        <div class="blog-pages">
            <div class="col-sm-12 panel">
                <div class="panel-body">
                    <h2 class="text-center">创作文章</h2>
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
                content: '' // 文章内容
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
            // 初始化标题和内容
            this.fillContent()
        },
        methods: {
            // 编辑器只会自动保存文章的内容，所以需要自己保存文章的标题
            saveTitle() {
                ls.setItem('smde_title', this.title)
            },
            // 初始化标题和内容
            fillContent() {
                const simplemde = this.simplemde
                const title = ls.getItem('smde_title')

                // 如果 localStoreage 有标题数据，使用它作为文章标题
                if (title !== null) {
                    this.title = title
                }

                // 使用编辑器的内容作为文章内容
                this.content = simplemde.value()
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
                    // 为 => 分发 post 事件，并附带参数 { article }
                    this.$store.dispatch('post', { article })
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