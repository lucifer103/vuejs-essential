import swal from 'sweetalert'

export default {
    install: (Vue) => {
        // sweetalert 的设置默认配置的方法
        swal.setDefaults({
            icon: 'warning',
            buttons: true,
        })

        // 添加全局方法
        Vue.swal = swal
        // 添加实例方法
        Vue.prototype.$swal = swal
    }
}