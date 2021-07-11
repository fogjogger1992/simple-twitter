import { apiHelper } from './../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  postTweet({ tweetData }) {
    return apiHelper.post('/tweets', tweetData)
  },
  getTweet() {
    return apiHelper.get('/tweets/:tweet_id')
  },
  getReply(){
    return apiHelper.get('tweets/:tweet_id/replies')
  }
}

    