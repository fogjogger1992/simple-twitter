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
    <NewTweetCard :user="user" @after-create-tweet="afterCreateTweet" />
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

// remove this after integrating API
const dummyData = {
  currentUser: {
    account: "foo",
    name: "foo",
    image: "https://i.pravatar.cc/300",
  },
  tweets: [
    {
      id: 1,
      text: "text text text text text text text text text text text text text text text",
      User: {
        account: "test1",
        name: "TSET1",
        image: "https://i.pravatar.cc/300",
      },
      createdAt: "2019-06-22T09:00:43.000Z",
      LikedUsers: [],
      Replies: [],
      isLiked: false,
    },
    {
      id: 2,
      text: "text text text text text text text text text text text text text text text text text text text text text text text text",
      User: {
        account: "test2",
        name: "TSET2",
        image: "https://i.pravatar.cc/300",
      },
      createdAt: "2021-06-22T09:00:43.000Z",
      LikedUsers: [],
      Replies: [],
      isLiked: false,
    },
  ],
};

export default {
  name: "Feeds",
  components: {
    NewTweetCard,
    TweetCard,
  },
  data() {
    return {
      user: {
        account: "",
        name: "",
        image: "",
      },
      tweets: [],
    };
  },
  created() {
    this.fetchUser();
    this.fetchTweets();
  },
  methods: {
    // TODO: 向後端API拉取資料
    fetchUser() {
      const { account, name, image } = dummyData.currentUser;
      this.user.account = account;
      this.user.name = name;
      this.user.image = image;
    },
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
    // TODO: 新增推文
    afterCreateTweet(payload) {
      const { tweetId, text } = payload;
      this.tweets.push({
        id: tweetId,
        text: text,
        User: {
          account: this.user.account,
          name: this.user.name,
          image: this.user.image,
        },
        createdAt: new Date(),
        LikedUsers: [],
        Replies: [],
        isLiked: false,
      });
    },
  },
};
</script> 