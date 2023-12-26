<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>无名百货欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- 声明式导航 务必要有to属性 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{ userName }}</a>
                        <a class="register" @click="loginout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">无名百货会员</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <!-- 编程式导航 -->
                    <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        // 搜索按钮的回调函数，编程式导航，向Search路由跳转
        goSearch() {
            // 路由传递参数
            // 1.字符串写法
            // this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase())
            //   2.模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 3.对象写法(path与params不能同时使用)
            if (this.$route.query) {
                let location = {
                    name: 'search',
                    params: {
                        // undefined：防止传递的参数为空的字符串时路径出现问题
                        keyword: this.keyword || undefined
                    },
                };
                location.query = this.$route.query;
                this.$router.push(location)
            }

        },
        // 退出登录
        async loginout() {
            try {
                // 1.发请求通知服务器退出登录【服务器清除数据：token】
                // 2.清除项目中的数据【userInfo,token】
                //    如果退出chengg
                await this.$store.dispatch('user/Logout')
                //    回到首页页面
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        }
    },
    mounted() {
        this.$bus.$on('clear', () => {
            this.keyword = '';
        })
    },
    computed: {
        userName() {
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>

<style scoped lang="less">
.header {

    //&表示 对父选择器的引用
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>