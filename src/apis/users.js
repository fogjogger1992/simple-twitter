import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get(`/current_user`)
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
}
