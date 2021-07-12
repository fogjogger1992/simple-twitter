import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get(`/current_user`)
  },
  signup({ userData }) {
    return apiHelper.post(`/users`, userData)
  },
  updateSetting({ userId, userData }) {
    return apiHelper.put(`/users/${userId}/edit`, userData)
  },
  updateInfo({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  getTopUsers() {
    return apiHelper.get("/users/top")
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  removeCover({ userId }){
    return apiHelper.delete(`/users/${userId}/cover`)
  }
}