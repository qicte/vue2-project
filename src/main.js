import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 引入elementUI 按需引入
import { Button, MessageBox } from 'element-ui'
// 注册全局组件
// 参数1：全局组件的名字  参数2：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// elementUI注册为全局组件
Vue.component(Button.name, Button)
// elementUi另外写法：挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServe.js----mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.min.css'

// 统一接收api文件夹里面全部所有请求函数
import * as API from '@/api'

// 引入图片懒加载插件
import VueLazyLoad from 'vue-lazyload'
// 引入懒加载默图片
import img from '@/assets/1.gif'
// 注册插件
Vue.use(VueLazyLoad, {
  // 懒加载默认图片
  loading: img
})

// 引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper'
})

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  // 组件身上都有$router，$route属性
  router,
  // 注册仓库：组件实例的身上会多一个$store
  store,
}).$mount('#app')
