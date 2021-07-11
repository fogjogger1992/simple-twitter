import { apiHelper } from './../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  // TODO: fix this
  createTweet({ userId, text }) {
    return apiHelper.post('/tweets', { userId, text })
  },
}

    