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
                            <a href="javascript:;" @click="deleteArticle" class="admin"><i
                                    class="fa fa-trash-o"></i></a>
                            <a href="javascript:;" @click="editArticle" class="admin"><i
                                    class="fa fa-pencil-square-o"></i></a>
                        </div>
                    </div>
                </div>

                <!-- 点赞 -->
                <div class="votes-container panel panel-default padding-md">
                    <div class="panel-body vote-box text-center">
                        <div class="btn-group">
                            <a href="javascript:;" @click="like" class="vote btn btn-primary popover-with-html"
                               :class="likeClass">
                                <i class="fa fa-thumbs-up"></i> {{ likeClass ? '已赞' : '点赞'}}
                            </a>
                            <div class="or"></div>
                            <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i>打赏
                            </button>
                        </div>
                        <div class="voted-users">
                            <div class="user-lists">
                                <span v-for="likeUser in likeUsers" :key="likeUser.uid">
                                    <!-- 点赞用户是当前用户时，加上类 animated 和 swing 以显示一个特别的动画，animated 是固定的，swing 是动画名称 -->
                                    <route-link :to="`/${likeUser.uname}`" :src="likeUser.uavatar" tag="img"
                                                class="img-thumbnail avatar avatar-middle"
                                                :class="{ 'animated swing' : likeUser.uid === 1 }"></route-link>
                                </span>
                            </div>
                            <div v-if="!likeUsers.length" class="vote-hint">成为第一个点赞的人吧 😄</div>
                        </div>
                    </div>
                </div>

                <!-- 打赏弹窗 -->
                <Modal :show.sync="showQrcode" class="text-center">
                    <div v-if="user" slot="title">
                        <img :src="user.avatar" alt="" class="img-thumbnail avatar" width="48">
                    </div>
                    <div>
                        <p class="text-md">如果你想学习更多前端的知识，VuejsCaff.com 是个不错的开始</p>
                        <div class="payment-qrcode inline-block">
                            <h5>扫一扫打开 VuejsCaff.com</h5>
                            <p>
                                <qrcode-vue value="https://vuejscaff.com/" :size="160"></qrcode-vue>
                            </p>
                        </div>
                    </div>
                    <div slot="footer">
                        <div class="text-center">祝你学习愉快 :)</div>
                    </div>
                </Modal>

                <!-- 评论列表 -->
                <div class="replies panel panel-default list-panel replies-index">
                    <div class="panel-heading">
                        <div class="total">
                            回复数量：<b>{{ comments.length }}</b>
                        </div>
                    </div>
                    <div class="panel-body">
                        <ul id="reply-list" class="list-group row">
                            <li v-for="(comment, index) in comments" :key="comment.commentId"
                                class="list-group-item media">
                                <div class="avatar avatar-container pull-left">
                                    <router-link :to="`/${comment.uname}`">
                                        <img :src="comment.uavatar" alt=""
                                             class="media-object img-thumbnail avatar avatar-middle">
                                    </router-link>
                                </div>
                                <div class="infos">
                                    <div class="media-heading">
                                        <router-link :to="`/${comment.uname}`"
                                                     class="remove-padding-left author rm-link-color">
                                            {{ comment.uname }}
                                        </router-link>
                                        <!-- 编辑删除图标 -->
                                        <span v-if="auth" class="operate pull-right">
                                            <span v-if="comment.uid === 1">
                                                <a href="javascript:;" @click="editComment(comment.commentId, index)"><i
                                                        class="fa fa-edit"></i></a>
                                                <span> ⋅ </span>
                                                <a href="javascript:;" @click="deleteComment(comment.commentId)"><i
                                                        class="fa fa-trash-o"></i></a>
                                            </span>
                                        </span>
                                        <div class="meta">
                                            <a href="`#reply${index + 1}`" :id="`reply${index + 1}`" class="anchor">#{{
                                                index + 1 }}</a>
                                            <span> ⋅ </span>
                                            <abbr title="" class="timeago">
                                                {{ comment.date | moment('from', { startOf: 'second' }) }}
                                            </abbr>
                                        </div>
                                    </div>

                                    <div class="preview media-body markdown-reply markdown-body"
                                         v-html="comment.content"></div>
                                </div>
                            </li>
                        </ul>
                        <div v-show="!comments.length" class="empty-block">
                            暂无评论~~
                        </div>
                    </div>
                </div>
                <!-- 评论框 -->
                <div id="reply-box" class="reply-box form box-block">
                    <div class="form-group comment-editor">
                        <textarea v-if="auth" name="" id="editor"></textarea>
                        <textarea v-else disabled class="form-control" placeholder="需要登陆后才能发表评论。"
                                  style="height: 172px; " name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div class="form-group reply-post-submit">
                        <button id="reply-btn" :disabled="!auth" @click="comment" class="btn btn-primary">
                            {{ commentId ? '保存编辑' : '回复' }}
                        </button>
                        <span v-show="commentId" class="help-inline btn-cancel" style="cursor: pointer;"
                              @click="cancelEditComment">取消编辑</span>
                        <span v-show="!commentId" class="help-inline">Ctrl+Enter</span>
                    </div>
                    <div v-show="commentHtml" id="preview-box" class="box preview markdown-body"
                         v-html="commentHtml"></div>
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
    import {mapState} from 'vuex'
    // 引入 qrcode.vue 的默认值
    import QrcodeVue from 'qrcode.vue'

    export default {
        name: 'Content',
        // 添加 components 选项，并注册 QrcodeVue
        components: {
            QrcodeVue
        },
        // 相关数据
        data() {
            return {
                title: '',  // 文章标题
                content: '',    // 文章内容
                date: '',   // 创建时间
                uid: 1, // 用户 ID
                likeUsers: [],  // 点赞用户列表
                likeClass: '',  // 点赞样式
                showQrcode: false,  // 是否显示打赏弹窗
                commentHtml: '',    // 评论 HTML
                comments: [],   // 评论列表
                commentId: undefined,   // 评论 ID
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
                // 获取文章中的用户 ID、标题、内容、点赞用户以及日期
                let {uid, title, content, date, likeUsers, comments} = article

                // 设置实例的 uid
                this.uid = uid
                this.title = title
                // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
                // 先使用 emojify 方法解析 emoji 字符串标识，name => name 标识不认识的就返回原值
                this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name, name => name))
                // 设置当前实例的 date
                this.date = date
                // 更新实例的 likeUsers
                this.likeUsers = likeUsers || []
                // 更新 likeClass，点赞用户列表包含当前用户时，赋值为 active ，表示已赞
                this.likeClass = this.likeUsers.some(likeUser => likeUser.uid === 1) ? 'active' : ''
                // 渲染文章的 comments
                this.renderComments(comments)

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
        mounted() {
            // 已登录时，才开始创建
            if (this.auth) {
                // 自动高亮编辑器的内容
                window.hljs = hljs

                const simplemde = new SimpleMDE({
                    element: document.querySelector('#editor'),
                    placeholder: '请使用 Markdown 格式书写；-)，代码片段黏贴时请注意使用高亮语法。',
                    spellChecker: false,
                    autoDownloadFontAwesome: false,
                    // 不显示工具栏
                    toolbar: false,
                    // 不显示状态栏
                    status: false,
                    renderingConfig: {
                        codeSyntaxHighlighting: true
                    }
                })

                // 内容改变监听
                simplemde.codemirror.on('change', () => {
                    // 更新 commentMarkdown 为编辑器的内容
                    this.commentMarkdown = simplemde.value()
                    // 更新 commentHtml，先替换原内容中的 emoji 标识，然后使用 markdown 方法将内容转成 HTML
                    this.commentHtml = simplemde.markdown(emoji.emojify(this.commentMarkdown, name => name, name => name))
                })

                // 按键松开监听
                simplemde.codemirror.on('keyup', (codemirror, event) => {
                    // 使用 Ctrl+Enter 时提交评论
                    if (event.ctrlKey && event.keyCode === 13) {
                        this.comment()
                    } else if (this.commentId && event.keyCode === 27) {    // 存在 commentId，且按下 Esc 键时
                        // 取消编辑评论
                        this.cancelEditComment()
                    }
                })

                // 将编辑器添加到当前实例
                this.simplemde = simplemde
            }
        },
        methods: {
            // 编辑文章
            editArticle() {
                // 点击编辑文章图标，跳到编辑文章页面，并附带当前文章 ID
                this.$router.push({name: 'Edit', params: {articleId: this.articleId}})
            },
            // 删除文章
            deleteArticle() {
                this.$swal({
                    text: '你确定要删除此内容吗？',
                    buttons: ['取消', '删除']
                }).then((value) => {
                    if (value) {
                        this.$store.dispatch('post', {articleId: this.articleId})
                    }
                })
            },
            like(e) {
                // 未登录时，提示登录
                if (!this.auth) {
                    this.$swal({
                        text: '需要登录以后才能执行此操作。',
                        buttons: ['取消', '前往登录']
                    }).then((value) => {
                        if (value) {
                            this.$router.push('/auth/login')
                        }
                    })
                } else {
                    const target = e.currentTarget
                    // 点赞按钮是否含有 active 类，用它来判断是否已赞
                    const active = target.classList.contains('active')
                    const articleId = this.articleId

                    if (active) {
                        // 清除已赞样式
                        this.likeClass = ''
                        // 分发 like 事件取消赞，更新实例的 likeUsers 为返回的值
                        // eslint-disable-next-line no-unused-vars
                        this.$store.dispatch('like', {articleId}).then((likeUsers) => {
                            // 使用带用户信息的点赞用户
                            this.likeUsers = this.recompute('likeUsers')
                        })
                    } else {
                        // 添加已赞样式
                        this.likeClass = 'active animated rubberBand'
                        // 分发 like 事件，传入 isAdd 参数点赞，更新实例的 likeUsers 为返回的值
                        // eslint-disable-next-line no-unused-vars
                        this.$store.dispatch('like', {articleId, isAdd: true}).then((likeUsers) => {
                            // 使用带用户信息的点赞用户
                            this.likeUsers = this.recompute('likeUsers')
                        })
                    }
                }
            },
            comment() {
                // 编辑器的内容不为空时
                if (this.commentMarkdown && this.commentMarkdown.trim() !== '') {
                    // 分发 comment 事件以提交评论
                    this.$store.dispatch('comment', {
                        comment: {content: this.commentMarkdown},
                        articleId: this.articleId,
                        // 传入 commentId
                        commentId: this.commentId
                    }).then(this.renderComments)    // 在 .then 的回调里，调用 this.renderComments 渲染评论

                    // 有 commentId 时，取消编辑评论
                    if (this.commentId) {
                        this.cancelEditComment()
                    } else {    // 没有 commentId 时，写入原来的逻辑
                        // 清空编辑器
                        this.simplemde.value('')
                        // 使回复按钮获得焦点
                        document.querySelector('#reply-btn').focus()

                        // 将最后的评论滚动到页面的顶部
                        this.$nextTick(() => {
                            const lastComment = document.querySelector('#reply-list li:last-child')
                            if (lastComment) {
                                lastComment.scrollIntoView(true)
                            }
                        })
                    }
                }
            },
            renderComments(comments) {
                if (Array.isArray(comments)) {
                    // 深拷贝 comments 以不影响其原值
                    /**
                     * 等价于以下代码：
                     * const newComments = comments.map(function (comment) {
                     *     return Object.assign({}, comment)
                     * })
                     * 这种方法只处理了对象的第一层数据，当对象能被 JSON 解析时，可以使用下面的方法进行完成的深拷贝
                     * JSON.parse(JSON.stringify(comments))
                     */
                    // 使用带用户信息的评论
                    comments = this.recompute('comments')
                    const newComments = comments.map(comment => ({...comment}))
                    // eslint-disable-next-line no-unused-vars
                    const user = this.user || {}
                    for (let comment of newComments) {
                        // 将评论内容从 Markdown 转成 HTML
                        comment.content = SimpleMDE.prototype.markdown(emoji.emojify(comment.content, name => name, name => name))
                    }

                    // 更新实例的 comments
                    this.comments = newComments
                    // 将 Markdown 格式的评论添加到当前实例
                    this.commentsMarkdown = comments
                }
            },
            // 编辑评论
            editComment(commentId, commentIndex) {
                // 编辑器
                const simplemde = this.simplemde
                // 编辑器
                const codemirror = simplemde.codemirror
                // Markdown 格式的所有评论
                const comments = this.commentsMarkdown

                for (const comment of comments) {
                    // 找到与 commentId 对应的评论时
                    if (parseInt(comment.commentId) === parseInt(commentId)) {
                        // 设置编辑器的内容
                        simplemde.value(comment.content)
                        // 使编辑器获得焦点
                        codemirror.focus()
                        // 将光标移到内容的后面
                        codemirror.setCursor(codemirror.lineCount(), 0)
                        // 评论索引 + 1，用来指示页面滚动的位置
                        this.commentIndex = commentIndex + 1
                        // 更新 commentId
                        this.commentId = commentId
                        break
                    }
                }
            },
            // 取消编辑评论
            cancelEditComment() {
                // 清除 commentId
                this.commentId = undefined
                // 清空编辑器
                this.simplemde.value('')

                // 下次 DOM 更新后，将评论滚动回视图的顶部
                this.$nextTick(() => {
                    if (this.commentIndex === undefined) {
                        return
                    }
                    const currentComment = document.querySelector(`#reply-list li:nth-child(${this.commentIndex}`)

                    if (currentComment) {
                        currentComment.scrollIntoView(true)
                        currentComment.querySelector('.operate a').focus()
                    }
                })
            },
            // 删除评论
            deleteComment(commentId) {
                this.$swal({
                    text: '你确定要删除此评论吗？',
                    buttons: ['取消', '删除']
                }).then((value) => {
                    if (value) {
                        // 此时不用传入 comment
                        this.$store.dispatch('comment', {
                            commentId,
                            articleId: this.articleId
                        }).then(this.renderComments)
                        this.cancelEditComment()
                    }
                })
            },
            // 返回带用户信息的文章的某项属性
            recompute(key) {
                const articleId = this.$route.params.articleId
                // 这里的文章时基于 getters.computedArticles 的，所以包含用户信息了
                const article = this.$store.getters.getArticleById(articleId)
                let arr

                if (article) {
                    arr = article[key]
                }

                return arr || []
            },
        }
    }
</script>

<style scoped>

</style>