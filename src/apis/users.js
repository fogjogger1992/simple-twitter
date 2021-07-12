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
  updateInfo({ userId, userData }) {
    return apiHelper.put(`/users/${userId}`, userData)
  },
  getTopUsers () {
    return apiHelper.get("/users/top")
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
}
