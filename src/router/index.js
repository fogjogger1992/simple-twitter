import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'
import store from './../store'

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
    path: '/admin',
    name: 'admin-signin',
    component: () => import('../views/AdminSignIn.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    // redirect: '/admin_main',
    children: [
      {
        name: "admin-tweets",
        path: 'admin_main',
        component: () => import("@/views/AdminTweets.vue"),
      },
      {
        name: "admin-users",
        path: 'admin_users',
        component: () => import("@/views/AdminUsers.vue"),
      },
    ],
  },
  {
    path: '/tweets',
    name: 'home',
    component: Home,
    children: [
      {
        name: 'tweets',
        path: '/',
        component: () => import('../views/Tweets.vue'),
      },
      {
        name: 'tweet',
        path: ':id',
        component: () => import('../views/Tweet.vue'),
      },
      {
        path: '/users',
        name: 'user',
        redirect: '/users/:id',
        component: () => import('../views/User.vue'),
        children: [
          {
            name: 'user-tweets',
            path: ':id',
            component: () => import('../views/UserTweets.vue'),
          },
          {
            name: 'user-follower',
            path: ':id/follower',
            component: () => import('../views/UserFollower.vue'),
          },
          {
            name: 'user-following',
            path: ':id/following',
            component: () => import('../views/UserFollowing.vue'),
          },
        ],
      },
    ],
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

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

export default router