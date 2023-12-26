// 对于axios进行二次封装
// 原因：请求拦截器、响应拦截器

//引入axios
import axios from 'axios';

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:进度条开始  done：进度条结束

import store from '@/store'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    baseURL: "/api",//基础路径，发送请求时候，路径都会出现api
    timeout: 5000,//代表请求超时时间5s

});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求法出去之前做一些事情
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        //给请求头添加一个字段，和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    // 判断是否需要携带token个服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条开始动
    nprogress.start();
    return config;
})

// 响应拦截器：
requests.interceptors.response.use(
    (res) => {
        // 成功的回调，服务器相应数据回来以后，响应拦截器有检测到，可以做一些事情
        //   进度条结束
        nprogress.done();
        return res.data;
    },
    (err) => {
        // 响应失败的回调
        // 终结promise链
        return Promise.reject(new Error('faile'));
    })

// 对外暴露
export default requests;