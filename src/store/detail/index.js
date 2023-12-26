import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
// 分装游客身份模块uuid
import { getUUID } from '@/utils/uuid_token'
export default {
    namespaced: true,
    state: {
        goodInfo: {},
        // 游客链式身份
        uuid_token: getUUID(),
    },
    actions: {
        // 获取产品信息的action
        async getGoodsInfo({ commit }, skuId) {
            let result = await reqGoodsInfo(skuId);
            if (result.code === 200) {
                // 成功
                commit('GETGOODSINFO', result.data)
            }
        },
        // 将产品添加到购物车
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表操作成功
        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
            const result = await reqAddOrUpdateShopCart(skuId, skuNum);
            //    当前这个函数如果执行返回Promise
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('falie'))
            }
        }

    },
    mutations: {
        GETGOODSINFO(state, goodInfo) {
            state.goodInfo = goodInfo
        },
        // ADDOrUpdateSHOPCART(state,)

    },
    getters: {
        // 路径导航简化数据
        categoryView(state) {
            // state.goodInfo初始状态空对象  空对象的categoryView为undefined
            // 当前计算出的至少是一个空对象  假错误不会再报
            return state.goodInfo.categoryView || {};
        },
        // 产品信息简化
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        // 产品售卖属性简化
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        }
    }
}