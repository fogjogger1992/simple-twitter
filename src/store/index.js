import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/admin'
import tweets from './modules/tweets'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // toast 顯示
    showPopup: false,
    popupColor: '',
    popupMsg: '',
    // 整頁 loading
    showOverlayLoading: false,

    currentUser: {},
    isAuthenticated: false

  },
  mutations: {
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
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      // 移除token，登出
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }

  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 取登入使用者資訊
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, avatar, cover, email, introduction, password } = data
        console.log(data);

        commit('setCurrentUser', {
          id,
          account,
          name,
          avatar,
          cover,
          email,
          introduction,
          password
        })

      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
      }
    }

  },
  modules: {
    admin,
    tweets
  }
})