import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
// vuex模块化开发
export default {
    namespaced: true,//开启命名空间
    state: {
        // state中的数据默认初始值别洗挨饿，服务器返回数组就写数组【根据服务器返回值初始化的】
        categoryList: [],
        bannerList: [],
        floorList: [],

    },
    actions: {
        // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
        async categoryList({ commit }) {
            let result = await reqCategoryList();//返回的是promise
            if (result.code === 200) {
                commit('CATEGORYLIST', result.data)
            }
        },
        async bannerList({ commit }) {
            let result = await reqGetBannerList();
            if (result.code === 200) {
                commit('BANNERLIST', result.data)
            }
        },
        async floorList({ commit }) {
            let result = await reqGetFloorList();
            if (result.code === 200) {
                commit('FLOORLIST', result.data)
            }
        }
    },
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        BANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        FLOORLIST(state, floorList) {
            state.floorList = floorList
        }
    },
    getters: {

    }
}