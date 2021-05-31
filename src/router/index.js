import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
import Home from "../views/Home";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/pages/Login')
        },
        {
            path: '/pay',
            name: 'Pay',
            component: () => import('../views/pages/Pay')
        },
        {
            path: '/pay-success',
            name: 'PaySuccess',
            component: () => import('../views/pages/PaySuccess')
        },
        {
            path: '/product',
            name: 'Product',
            component: () => import('../views/product/ProductDetail')
        },
        {
            path: '/confirm',
            name: 'Confirm',
            component: () => import('../views/buy/ProductConfirm')
        },
        {
            path: '/cart-list',
            name: 'CartList',
            component: () => import('../views/buy/CartList')
        },
        {
            path: '/cart-confirm',
            name: 'CartConfirm',
            component: () => import('../views/buy/CartConfirm')
        },
        {
            path: '/order',
            name: 'Order',
            component: () => import('../views/buy/Order')
        },
        {
            path: '/order-list',
            name: 'OrderList',
            component: () => import('../views/order/OrderList')
        },
        {
            path: '/order-detail',
            name: 'OrderDetail',
            component: () => import('../views/order/OrderDetail')
        },
        {
            path: '/personal',
            name: 'Personal',
            redirect: '/info',
            meta: {
                requireAuth: true
            },
            component: () => import('../views/personal/Personal'),
            children: [
                {
                    path: '/info',
                    name: 'PersonInfo',
                    component: () => import('../views/personal/widgets/PersonalInfo')
                },
                {
                    path: '/address',
                    name: 'ReceiveAddress',
                    component: () => import('../views/personal/widgets/ReceiveAddress')
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.token && store.state.userInfo) {
            next()
        } else {
            next({path: '/login'})
        }
    } else {
        next()
    }
})

export default router