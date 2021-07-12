import { apiHelper } from './../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  createTweet({ tweetData }) {
    return apiHelper.post('/tweets', tweetData)
  },
  // TODO: fix this
  // createTweet({ userId, text }) {
  //   return apiHelper.post('/tweets', { userId, text })
  // },
}

    