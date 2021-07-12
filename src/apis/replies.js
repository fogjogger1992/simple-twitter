import { apiHelper } from '../utils/helpers'

export default {
  createReply({ tweetId, replyData}) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, replyData)
  }
}