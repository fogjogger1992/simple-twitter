<template>
  <v-container class="ma-0 pa-0">
    <!-- top nav -->
    <v-card
      tile
      flat
      class="pa-3 align-center"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
      >首頁</v-card
    >
    <!-- add tweet -->
    <NewTweetCard
      :current-user="currentUser"
      @after-create-tweet="afterCreateTweet"
    />
    <v-system-bar style="height: 10px"></v-system-bar>
    <!-- tweets list -->
    <div class="tweetslist">
      <TweetCard
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
        :user="tweet.User"
      />
    </div>
  </v-container>
</template>

<style scoped>
.tweetslist {
  height: calc(100vh - 211px);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

<script>
import NewTweetCard from "../components/NewTweetCard.vue";
import TweetCard from "../components/TweetCard.vue";
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Feeds",
  components: {
    NewTweetCard,
    TweetCard,
  },
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getTweets();
        this.tweets = response.data;
      } catch (error) {
        "error", error;
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        });
      }
    },
    //TODO: fix this
    afterCreateTweet(payload) {
      const { tweetId, text } = payload;
      this.tweets.push({
        id: tweetId,
        text: text,
        User: {
          id: this.currentUser.id,
          account: this.currentUser.account,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar,
        },
        createdAt: new Date(),
      });
    },
  },
};
</script> 