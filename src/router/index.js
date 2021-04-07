import Vue from 'vue'
import VueRouter from 'vue-router'
// import Cart from "../views/cart/Cart";
// import Home from "../views/home/Home";
// import Category from "../views/category/Category";
// import Profile from "../views/profile/Profile";
Vue.use(VueRouter)
const Home =()=>import('views/home/Home')
const Cart =()=>import('views/cart/Cart')
const Category =()=>import('views/category/Category')
const Profile =()=>import('views/profile/Profile')


const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  }
]

const router =new VueRouter({
  routes
  }
)



export default router
