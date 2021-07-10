import { apiHelper } from '../utils/helpers'
// const getToken = () => localStorage.getItem('token')

export default {
  getTweets () {
    return apiHelper.get(`/admin/tweets`)
  },
  deleteTweet (id) {
    return apiHelper.delete(`/admin/tweets/${id}`)
  },
  getUsers (){
    return apiHelper.get(`/admin/users`)
  },

}