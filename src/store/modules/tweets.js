const state = () => ({
  tweetData: {},
  isTweetReplyDialogOpened: false

})


const actions = {

}

const mutations = {
  setTweet(state, tweetData) {
    console.log("tweetData: ", tweetData);
    state.tweetData = tweetData
  },
  setIsTweetReplyDialogOpened(state, isTweetReplyDialogOpened) {
    console.log("isTweetReplyDialogOpened: ", isTweetReplyDialogOpened);
    state.isTweetReplyDialogOpened = isTweetReplyDialogOpened
  },

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};