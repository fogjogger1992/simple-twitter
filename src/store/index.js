import Vue from 'vue'
import Vuex from 'vuex'

import tweets from './modules/tweets'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // followship update
    followshipUpdate: false,
    topFollowshipUpdate: false,
    // toast 顯示
    showPopup: false,
    popupColor: '',
    popupMsg: '',
    // 整頁 loading
    showOverlayLoading: false,

    currentUser: {
      id: -1,
      account: "",
      name: "",
      email: "",
      avatar: "",
      cover: "",
      introduction: ""
    },
    isAuthenticated: false,
    token: ''

  },
  mutations: {
    // followship update
    setfollowshipUpdate(state) {
      state.followshipUpdate = !state.followshipUpdate
    },
    setTopFollowshipUpdate(state) {
      state.topFollowshipUpdate = !state.topFollowshipUpdate
    },
    setShowPopup(state, showPopup) {
      state.showPopup = showPopup
    },
    setPopupDetails(state, { popupColor, popupMsg }) {
      state.popupColor = popupColor
      state.popupMsg = popupMsg
    },
    setShowOverlayLoading(state) {
      state.showOverlayLoading = !state.showOverlayLoading
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser
      // 將使用者的登入狀態改為 true
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      // 移除token，登出
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }

  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 取登入使用者資訊
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, avatar, cover, email, introduction, role } = data
        // console.log('currentUser data: ', data);
        commit('setCurrentUser', {
          id,
          account,
          name,
          avatar,
          cover,
          email,
          introduction,
          role
        })
        return true

      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
        // 驗證失敗的話，代表不是有效user，要清除state中的token
        commit('revokeAuthentication')
        return false
      }
    }

  },
  modules: {
    tweets
  }
})