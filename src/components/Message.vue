<template>
    <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
        <button @click="close" type="button" class="close"><span>×</span></button>
        {{ msg }}
    </div>
</template>

<script>
    export default {
        name: 'Message',
        props: {
            // 是否显示消息框
            show: {
                type: Boolean,
                default: false
            },
            // 消息框的类型
            type: {
                type: String,
                default: 'success'
            },
            // 消息
            msg: {
                type: String,
                default: ''
            }
        },
        watch: {
            show(value) {
                if (value) {
                    this.$nextTick(() => {
                        this.$el.scrollIntoView(true)
                    })
                }
            }
        },
        methods: {
            close() {
                // 可以触发一个事件来更新 show
                this.$emit('update:show', false)

                // 不可直接修改 props 中的 show，这会导致 Vue 在控制台发出错误警告
                // this.show = false
            }
        }
    }
</script>

<style scoped>

</style>