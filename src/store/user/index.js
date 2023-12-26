import { reqGetCode, reqLogin, reqLogout, reqRegister, reqUserInfo } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token";
// 登录与注册模块
export default {
    namespaced: true,
    state: {
        // 验证码
        code: '',
        token: getToken(),
        userInfo: {}

    },
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            //获取验证码的接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上，省钱
            const result = await reqGetCode(phone);
            if (result.code === 200) {
                // 代表请求获取验证码成功
                commit('GETCODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 注册
        async register({ commit }, data) {
            const result = await reqRegister(data);
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 登录[token]
        async login({ commit }, data) {
            const result = await reqLogin(data);
            console.log(result)
            if (result.code === 200) {

                // 服务器下发token，用户唯一标识符（uuid）
                // 经常用token请求用户信息
                // 用户已经登录成功且获取到token
                commit('LOGIN', result.data.token)
                // 本地存储持久化
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async getUserInfo({ commit }) {
            const result = await reqUserInfo();
            console.log(result)
            if (result.code === 200) {
                commit('GETUSERINFO', result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 退出登录
        async Logout({ commit }) {
            // 只是向服务器发送请求，通知服务器清除token
            const result = await reqLogout();
            if (result.code === 200) {
                // actions中不能操作state，提交muation修改state
                commit('CLEAR')
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        //获取验证码
        GETCODE(state, code) {
            state.code = code;
        },
        LOGIN(state, token) {
            state.token = token;
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CLEAR(state) {
            state.token = '';
            state.userInfo = {}
            removeToken();
        }
    },
    getters: {

    }

}