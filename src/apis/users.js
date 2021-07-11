import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get(`/current_user`)
  },
  updateSetting({ userId, userData }){
    return apiHelper.put(`/users/${userId}/edit`, userData)
  }

}
