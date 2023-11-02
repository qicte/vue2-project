import { reqShopCartInfo, reqDeleteCartById, reqChangeIsChecked } from "@/api"

export default {
    namespaced: true,
    state: {
        shopCartInfo: []
    },
    actions: {
        async getShopCartInfo({ commit }) {
            let result = await reqShopCartInfo();
            if (result.code === 200) {
                commit('GETSHOPCARTINFO', result.data)
            }
        },
        async deleteCartById({ commit }, skuId) {
            let result = await reqDeleteCartById(skuId);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        async changeIsChecked({ commit }, { skuId, isChecked }) {
            let result = await reqChangeIsChecked(skuId, isChecked);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        deleteAllChecked({ getters, dispatch }) {
            let PromiseAll = [];
            getters.cartList.cartInfoList.forEach(item => {
                let result = item.isChecked === 1 ? dispatch('deleteCartById', item.skuId) : ''
                PromiseAll.push(result);
            });
            // 主要全部的p1|p2..都成功,返回结果成功
            return Promise.all(PromiseAll)
        },
        changeAllChecked({ getters, dispatch }, allChecked) {
            let PromiseAll = [];
            getters.cartList.cartInfoList.forEach(item => {
                let result = dispatch('changeIsChecked', { skuId: item.skuId, isChecked: allChecked })
                PromiseAll.push(result)
            })
            return Promise.all(PromiseAll)

        }

    },
    mutations: {
        GETSHOPCARTINFO(state, shopCartInfo) {
            state.shopCartInfo = shopCartInfo;
        },
    },
    getters: {
        cartList(state) {
            return state.shopCartInfo[0] || {}
        },

    }
}