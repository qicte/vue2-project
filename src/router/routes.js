// 引入路由组件



// 路由懒加载
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
// 二级路由组件
const myOrder = () => import('@/pages/Center/myOrder')
const groupOrder = () => import('@/pages/Center/groupOrder')

export default [
    // 一级路由
    {
        path: '/home',
        component: Home,
        // 路由元消息
        meta: {
            show: true
        }
    },
    {
        // params传递参数需要占位
        name: 'search',
        // 如何指定params参数可传可不传  
        // 在占位的：keyword后面加上？就是代表此参数可传可不传
        // 如果不加？而且路由跳转时候又不传递参数 则路径有问题 http://localhost:8080/#/?k=哈哈哈
        // ？正则方面 0|1
        path: '/search/:keyword?',
        component: Search,
        meta: {
            show: true,

        },
        // 路由组件能不能传递props数据
        // 布尔值写法 ：只能传递params参数
        // props: true,
        //对象写法：额外给路由组件传递一些props
        // props: { a: 1, b: 2 },
        // !!!函数写法 
        // props($route) {
        //     return {
        //         k: $route.query.k,
        //         keyword: $route.params.keyword
        //     }
        // }
        // 解构赋值
        props: ({ query, params }) => ({
            keyword: params.keyword,

        })
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    },
    {
        // 需要占位  传params参数
        path: '/detail/:skuid',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        },
        name: 'addcartsuccess'
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {
            show: true
        },
        name: 'shopcart'
    },
    // 重定向，在项目跑起来的时候，定向到首页
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/trade',
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // /交易页面必须是从购物车来
            if (from.path === '/shopcart') {
                next();
            } else {
                next(false);//代表从哪来回哪去
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true,
        },

    },
    {
        path: '/center',
        component: Center,
        meta: {
            show: true
        },
        // 引入二级路由
        children: [
            {
                path: 'myorder',
                component: myOrder,

            }, {
                path: 'grouporder',
                component: groupOrder
            },
        ],
        // 重定向
        redirect: '/center/myorder'
    }
]