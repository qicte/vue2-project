// 当前这个模块，API进行统一管理
import requests from './request.js'
import mockAjax from './mockAjax.js'

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 发请求:axios发请求返回结果：promise对象
// 已经在配置中加上baseURL：'/api'，这里就不用再写/api
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');


// 获取home轮播图数据
export const reqGetBannerList = () => mockAjax.get('/banner')
// 获取floor轮播图数据
export const reqGetFloorList = () => mockAjax.get('/floor')
// 获取searc模块数据  地址：/api/list  请求方式  post  
// 参数：需要带参
// {
//     "category3Id": "61",
//         "categoryName": "手机",
//             "keyword": "小米",
//                 "order": "1:desc",
//                     "pageNo": 1,
//                         "pageSize": 10,
//                             "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//                                 "trademark": "4:小米"
// }
// 当前这个函数需要接受外部传递参数
// params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    method: "post",
    url: '/list',
    data: params,
})
// 获取详情信息数据
export const reqGoodsInfo = (params) => requests({
    method: 'get',
    url: `/item/${params}`
})
// 添加到购物车或者更新某个产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
// 获取购物车列表
export const reqShopCartInfo = () => requests({
    url: '/cart/cartList',
    method: 'get'
})
// 删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
})
// 切换商品选中状态
export const reqChangeIsChecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
// 获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})
// 注册
export const reqRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})
// 登录
export const reqLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post'
})
// 获取用户信息（带着token）
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})
// 退出登录
export const reqLogout = () => requests({
    url: 'user/passport/logout',
    method: 'get'
})
// // 获取用户地址信息
// export const reqAddressInfo = () => requests({
//     url: '/user/userAddress/auth/findUserAddressList',
//     method: 'get'
// })
export const reqAddressInfo = () => mockAjax.get('/address')

// 获取商品清单
export const reqOrderInfo = () => requests({
    url: 'order/auth/trade',
    method: 'get'
})
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})
// 获取订单支付信息
export const reqGetOrderPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})
// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})
// 获取我的订单列表  page:页数  limi：每页显示的数量
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})