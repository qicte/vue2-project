import { reqAddressInfo, reqOrderInfo } from "@/api"

export default {
    namespaced: true,
    state: {
        addressInfo: [],
        orderInfo: {}
    },
    actions: {
        // 获取地址
        async getAddressList({ commit }) {
            const result = await reqAddressInfo();
            if (result.code === 200) {
                console.log(result)
                commit('GETADDRESSLIST', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取商品清单
        async getOrderInfo({ commit }) {
            const result = await reqOrderInfo();
            if (result.code === 200) {
                commit('GETORDERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        GETADDRESSLIST(state, addressInfo) {
            state.addressInfo = addressInfo;
        },
        GETORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        }
    },
    getters: {

    }
}