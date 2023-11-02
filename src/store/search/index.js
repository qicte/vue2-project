// vuex模块化开发
import { reqGetSearchInfo } from "@/api"

export default {
    namespaced: true,
    state: {
        searchList: {},
    },
    actions: {
        // 获取search模块数据
        async getSearchList({ commit }, params = {}) {
            // reqGetSearchInfo至少应该空对象参数
            let result = await reqGetSearchInfo(params);
            if (result.code === 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }

    },
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList;
        }
    },
    // 计算属性，在项目当中，为简化仓库数据而生
    getters: {
        goodsList({ searchList }) {
            // return searchList.goodsList 这样写有问题，因为searchList有可能是空对象,返回结果可能是underfined
            // state.searchList.goodsList如果服务器返回数据，没问题是个数组
            // 假如网络不给力|没有网络state.searchList.goodList应该返回的是undefined
            // 计算新的属性值至少返回[]，以防万一
            return searchList.goodsList || []
        },
        attrsList({ searchList }) {
            return searchList.attrsList || []
        },
        trademarkList({ searchList }) {
            return searchList.trademarkList || []
        },
    }
}