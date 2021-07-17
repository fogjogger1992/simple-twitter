import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import HomeTopUsers from '@/views/HomeTopUsers.vue'
import Admin from '@/views/Admin.vue'
import store from './../store'

Vue.use(VueRouter)

// 如果是已登入的普通會員進入後台，導回 /admin/signin (會接著被導到 /tweets 頁)
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    next('/admin/signin')
    return
  } 
  next()
}

// 如果是已登入的管理員進入前台，導到 /admin/main
const authorizeIsNormal = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'normal') {
    next('/admin/main')
    return
  } 
  next()
}

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
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('../views/AdminSignIn.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = store.state.currentUser
      if (currentUser && currentUser.role === 'admin') {
        next('/admin/main')
        return
      }
      next()
    },
  },
  {
    path: '/admin',
    name: 'admin',
    exact: true,
    component: Admin,
    redirect: 'admin/main',
    beforeEnter: authorizeIsAdmin,
    children: [
      {
        name: 'admin-tweets',
        path: 'main',
        component: () => import('@/views/AdminTweets.vue'),
        // beforeEnter: authorizeIsAdmin,
      },
      {
        name: 'admin-users',
        path: 'users',
        component: () => import('@/views/AdminUsers.vue'),
        // beforeEnter: authorizeIsAdmin,
      },
    ],
  },
  {
    path: '/',
    name: 'home-side-nav-bar',
    component: () => import('../views/HomeSideNavBar.vue'),
    children: [
      {
        path: '/tweets',
        name: 'home-top-users',
        component: HomeTopUsers,
        beforeEnter: authorizeIsNormal,
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
            name: 'notification',
            path: '/notification',
            component: () => import('../views/Notification.vue'),
          },
          {
            path: '/users',
            name: 'user',
            redirect: '/users/:id',
            component: () => import('../views/User.vue'),
            children: [
              {
                name: 'user-profile',
                path: ':id',
                redirect: '/users/:id/tweets',
                component: () => import('../views/UserProfile.vue'),
                children: [
                  {
                    name: 'user-tweets',
                    path: 'tweets',
                    component: () => import('@/views/UserTweets.vue'),
                  },
                  {
                    name: 'user-replies',
                    path: 'replies',
                    component: () => import('@/views/UserReplies.vue'),
                  },
                  {
                    name: 'user-likes',
                    path: 'likes',
                    component: () => import('@/views/UserLikes.vue'),
                  },
                ],
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
        path: '/chatroom',
        name: 'chatroom',
        component: () => import('../views/Chatroom.vue'),
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('../views/Message.vue'),
      },
      {
        path: '/setting',
        name: 'account-setting',
        component: () => import('../views/Setting.vue'),
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

router.beforeEach(async (to, from, next) => {
  // get token from localStorage
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  // 有 token && token 跟 tokenInStore 不同才向後端驗證
  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathWithoutAuthentications = ['sign-in', 'sign-up','admin-sign-in']
  // redirect to '/signin'
  if (!isAuthenticated && !pathWithoutAuthentications.includes(to.name)) {
    next('/signin')
    return
  }
  // redirect to '/tweets'
  if (isAuthenticated && pathWithoutAuthentications.includes(to.name)) {
    next('/tweets')
    return
  }

  // console.log("from: ", from, "to: ", to);
  // await store.dispatch('fetchCurrentUser')

  next()
})

export default router