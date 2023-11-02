// 引入mockjs模块
import Mock from "mockjs";
// 引入json数据[json数据格式根本没有对外暴露，但是可以引入]
// webpack默认对外暴露：图片、json数据格式
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'

// mockshuj：第一个参数请求地址  第二个参数：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner });//模拟首页轮播图数据
Mock.mock('/mock/floor', { code: 200, data: floor });//模拟floor数据
Mock.mock('/mock/address', { code: 200, data: address });//模拟address数据