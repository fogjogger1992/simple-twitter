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
  }

}