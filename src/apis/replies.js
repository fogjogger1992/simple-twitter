import { apiHelper } from '../utils/helpers'

export default {
  postReply({ tweetId, replyData}) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, replyData)
  }
}