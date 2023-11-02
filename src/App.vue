<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在home|search显示 在登录|注册隐藏 -->
    <!-- <Footer v-show="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <!-- 可以利用路由元消息在需要显示footer的路由添加show：true -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  data() {
    return {
      msg: 'abc'
    }
  },
  // 注册组件
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 此处只执行一次 
    // 通知vuex发请求，获取数据，存储仓库中
    this.$store.dispatch('home/categoryList');

  }

}
</script>

<style></style>
