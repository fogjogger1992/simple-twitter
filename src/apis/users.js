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
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getUserFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getUserFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  addFollowing({ followingId }) {
    return apiHelper.post('/followships', followingId)
  },
  deleteFollowing({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`)
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  deleteLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  }
}

