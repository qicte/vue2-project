<template>
    <div class="type-nav">
        <!-- <h1>{{ categoryList }}</h1> -->
        <div class="container">
            <!-- 事件委托 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委托实现编程式路由跳转 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                @mouseenter="changeIndex(index)" :class="{ cur: currentIndex === index }">
                                <h3>
                                    <a :data-categoryName='c1.categoryName' :data-category1Id="c1.categoryId">{{
                                        c1.categoryName
                                    }}</a>
                                    <!-- 此种情况不采纳声明式导航，因为router-link创建组件实例 一瞬间要创建1000+ 很耗内存 卡顿现象 -->
                                    <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                </h3>
                                <!-- 二三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex === index ? 'block' : 'none' }">
                                    <!-- <div class="item-list clearfix" v-show="currentIndex === index"> -->
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName='c2.categoryName' :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>

                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName='c3.categoryName'
                                                        :data-category3Id="c3.categoryId">{{
                                                            c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入lodash
// 此种引入方式是把lodash全部功能函数引入
// import _ from 'lodash';
// 最好按需引入
import throttle from 'lodash/throttle'


export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户鼠标移动在哪个index
            currentIndex: -1,
            show: true,
        }
    },
    // 组件挂载完毕，向服务器请求数据
    mounted() {
        // 判断路由不为home时，show修改为false
        if (this.$route.path !== '/home') {
            this.show = false;
        }
    },
    computed: {
        // 对象写法
        // 右侧需要的是一个函数，当使用这个计算谁能够的时候，右侧函数会立即执行一次
        //     // 注入一个参数state，其实即为大仓库的数据
        // ...mapState({
        //     categoryList: state => state.home.categoryList
        // })
        ...mapState('home', ['categoryList'])
    },
    methods: {
        // 节流
        // throttle回调函数别用箭头函数，可能出现上下文this问题
        changeIndex: throttle(function (index) {
            // 鼠标进入修改响应式数据currentIndex属性
            // index鼠标移动到一级分类的索引值
            // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类应该都触发进入事件，但是经过测试，只有部分触发
            // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有些大量业务，有可能出现卡顿现象
            this.currentIndex = index;

        }, 50),
        // 鼠标移出的事件回调
        // 当鼠标移动到全部分类时，要求背景颜色仍存在，可利用事件冒泡，采用事件委托，子盒子会触发父盒子
        // 将移出的事件交给两者的父亲去做
        leaveIndex() {
            this.currentIndex = -1;
            // 当组件不是home时，鼠标移除分类隐藏
            if (this.$route.path !== '/home') {
                this.show = false;
            }
        },

        // 路由跳转  编程式导航
        // 单纯利用编程式导航，同样会造成出现多个事件回调
        // 利用 事件委托+编程式导航
        // 利用事件委托要解决的问题：1.如何确定点击的是a标签  2.如何获得参数（1，2，3级分类的name和id）
        goSearch(event) {
            console.log(event.target.dataset)//dataset获取当前节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = event.target.dataset;
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                // 如何确立是1,2,3级分类 自定义属性category1id
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;

                } else if (category3id) {
                    query.category3Id = category3id;

                }
                // 整理完参数
                location.query = query
                // if (this.$route.params) {
                location.params = this.$route.params
                // }
                this.$router.push(location)

            } else {
                return
            }
        },
        // 鼠标进入后，显示三级联动
        enterShow() {
            this.show = true;
        }
    },
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        // 1）完成一级分类动态添加背景颜色
                        // 方法1.
                        // &:hover {
                        //     background-color: skyblue;
                        // }

                        a {
                            color: #333;


                        }

                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // 通过css控制二三级分类的显示隐藏
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }

                }
            }
        }

        // 过渡动画样式
        // 过渡动画开始状态
        .sort-enter {
            height: 0;
        }

        // 过渡动画结束状态
        .sort-enter-to {
            height: 461px;
        }

        .sort-enter-active {
            transition: all .2s linear;
        }

    }
}

// 1）完成一级分类动态添加背景颜色
// 方法2 获取鼠标移入的index赋值给currentIndex，若当前index与被选中的currentIndex相等，添加类名cur
.cur {
    background-color: skyblue;
}
</style>