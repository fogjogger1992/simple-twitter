import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/admin'
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
    }

  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 取登入使用者資訊
        const { data } = await usersAPI.getCurrentUser()
        const { account, name, avatar, email } = data

        commit('setCurrentUser', {
          account,
          name,
          avatar,
          email
        })

      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
      }
    }

  },
  modules: {
    admin
  }
})