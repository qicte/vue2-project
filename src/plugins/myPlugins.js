// vue插件一定暴露一个对象
let myPlugins = {

}
myPlugins.install = function (Vue, options) {
    console.log(Vue)
    console.log(options)
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive:自定义指令
    // Vue.component:
    // Vue.filter....(filter Vue3不采取)
    Vue.directive(options.name, (element, params) => {
        // element为绑定的元素
        // params 为对象
        // 变为大写
        element.innerHTML = params.value.toUpperCase()
    })

}

export default myPlugins