import Vue from 'vue'
import VueRouter from 'vue-router'

// components
import Login from "@/components/authentication/Login";
import UserHome from '@/components/user/Home';


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/me",
    name: "User-Home",
    component: UserHome,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router