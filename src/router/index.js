import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home'
// import Shop from '../views/shop/Shop'
// import Login from '../views/login/Login'
// import Register from '../views/register/Register'
const routes = [{
  path: '/',
  name: 'Home',
  // component: Home
  component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
}, {
  path: '/cartList',
  name: 'CartList',
  component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
}, {
  path: '/orderConfirmation/:id',
  name: 'OrderConfirmation',
  component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
}, {
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
}, {
  path: '/shop/:id',
  name: 'Shop',
  component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
},
{
  path: '/personalInfo',
  name: 'PersonalInfo',
  component: () => import(/* webpackChunkName: "personalInfo" */ '../views/personalInfo/PersonalInfo')
}, {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
  beforeEnter(to, from, next) {
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
}, {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
  // 每个页面进入之前会执行的函数
  beforeEnter(to, from, next) {
    // const isLogin = localStorage.isLogin
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 整体执行
router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.isLogin
  const { isLogin } = localStorage;
  (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) ? next({ name: 'Login' }) : next()
})

export default router
