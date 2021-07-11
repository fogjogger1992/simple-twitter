import { apiHelper } from '../utils/helpers'
// const getToken = () => localStorage.getItem('token')

export default {
  getTweets () {
    return apiHelper.get(`/admin/tweets`)
  },
  deleteTweet (tweetId) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
  getUsers (){
    return apiHelper.get(`/admin/users`)
  },

}