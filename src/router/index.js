import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin',
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/setting',
    name: 'account-setting',
    component: () => import('../views/Setting.vue'),
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('../views/AdminSignIn.vue'),
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue'),
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

export default router
