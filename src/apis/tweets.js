import { apiHelper } from './../utils/helpers'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI1OTEwMjQ4fQ.golOw4LoDBPAYjGdLHVc2nVq-rnWXpP4vciSBALoX9Y"

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

    