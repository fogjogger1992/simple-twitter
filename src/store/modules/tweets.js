const state = () => ({
  tweetInfo: {},
  tweetReplyDialogOpen: false
})


const actions = {

}

const mutations = {
  setTweet(state, tweetInfo) {
    state.tweetInfo = tweetInfo
  },
  setTweetReplyDialogOpen(state, tweetReplyDialogOpen) {
    state.tweetReplyDialogOpen = tweetReplyDialogOpen
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};