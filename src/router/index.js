// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";

import routes from './routes'
import store from "@/store";
// 使用插件
Vue.use(VueRouter);

// 先把VueRouter原型对象上的push，备份一下
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.Replace;

// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve, reject) {
        // originPush();//不直接这样写，是因为这样写表示调用window的originPush方法
        // call apply
        //    相同点：都可以调用函数因此，都可以篡改函数的上下文因此
        // 不同点：call与appy传递参数：call传递参数用逗号隔开，apply方法执行，传递参数
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });

    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve, reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });

    }
}
// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        // 返回的这个y=0 代表滚动条在最上方
        return { y: 0 }
    }
})

// 全局前置守卫：（路由跳转之前判断）
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name
    // to:可以获取到路由跳转的目的地
    // from：获取到从那里开始路由跳转
    // next（）放行 next（‘/login’)放行到指定路由  next(false):中断当前导航
    // 用户登录成功
    if (token) {
        // 用户想去登录页面，不可以,停留在首页
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            // 判断store中用户信息userInfo是否存在，不存在先派发再放行
            // if (!store.state.user.userInfo) {不能这样判断，因为空对象永远是真
            if (!name) {
                try {
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    //token失效
                    // 清除数据并回到登录页面
                    await store.dispatch('user/Logout');
                    next('/login')
                }
            } else {
                next();
            }
        }
    } else {
        console.log('111111')
        // 未登录时
        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1 || toPath.indexOf('/shopcart') !== -1) {
            // 把未登录想去时却去不了的地方带成参数
            next('login?redirect=' + toPath)
        } else {
            next()
        }

    }
})

export default router;