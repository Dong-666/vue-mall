import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/Home/Home')
const Category = () => import('views/Category/Category')
const Shopcart = () => import('views/Shopcart/Shopcart')
const Profile = () => import('views/Profile/Profile')
const Detail = () => import('views/Detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
