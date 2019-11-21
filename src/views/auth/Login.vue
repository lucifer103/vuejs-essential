<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">请登录</h3>
                </div>

                <div class="panel-body" data-validator-form>
                    <div class="form-group">
                        <label for="" class="control-label">用户名</label>
                        <input type="text" v-model.trim="username" v-validator.required="{ title: '用户名' }" class="form-control" placeholder="请填写用户名">
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label">密码</label>
                        <input type="password" v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" class="form-control" placeholder="请填写密码">
                    </div>
                    <br>
                    <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
                        <i class="fa fa-btn fa-sign-in"></i> 登录
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',   // 用户名
                password: '',   // 密码
                msg: '',    // 消息
                msgType: '',    // 消息类型
                msgShow: false  // 是否显示消息，默认不显示
            }
        },
        methods: {
            login(e) {
                this.$nextTick(() => {
                    const target = e.target.type === 'submit' ? e.target : e.target.parentElement

                    if (target.canSubmit) {
                        this.submit()
                    }
                })
            },
            submit() {
                // 表单里的用户信息
                const user = {
                    name: this.username,
                    password: this.password
                }
                // 仓库里的用户信息
                const localUser = this.$store.state.user

                if (localUser) {
                    // 检查用户名和密码是否匹配
                    if (localUser.name !== user.name || localUser.password !== user.password) {
                        this.showMsg('用户名或密码不正确')
                    } else {
                        // 匹配时，分发 login 事件进行登录
                        this.$store.dispatch('login')
                    }
                } else {
                    this.showMsg('不存在该用户')
                }
            },
            showMsg(msg, type = 'warning') {
                this.msg = msg
                this.msgType = type
                this.msgShow = false

                this.$nextTick(() => {
                    this.msgShow = true
                })
            }
        }
    }
</script>

<style scoped>

</style>