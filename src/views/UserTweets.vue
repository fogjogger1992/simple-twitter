<template>
  <v-container class="ma-0 pa-0">
    <UserProfileCard :user="user" :current-user="currentUser" />

    <!-- tabs -->
    <v-tabs
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
      background-color="transparent"
      color="primary"
    >
      <v-tab
        class="font-weight-bold"
        @click.stop.prevent="fetchTweets(user.id)"
      >
        推文
      </v-tab>
      <v-tab
        class="font-weight-bold"
        @click.stop.prevent="fetchReplies(user.id)"
      >
        推文與回覆
      </v-tab>
      <v-tab class="font-weight-bold" @click.stop.prevent="fetchLikes(user.id)">
        喜歡的內容
      </v-tab>
    </v-tabs>
    <!-- tweets list -->
    <TweetCard
      v-for="tweet in tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
      :user="user"
    />
  </v-container>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import TweetCard from "../components/TweetCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserTweets",
  components: {
    UserProfileCard,
    TweetCard,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        followingCounts: 0,
        followerCounts: 0,
        cover: "",
        introduction: "",
      },
      tweets: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
    this.fetchTweets(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);
    this.fetchTweets(id);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const {
          id,
          name,
          account,
          avatar,
          followingCounts,
          followerCounts,
          cover,
          introduction,
        } = data;

        this.user = {
          ...this.user,
          id,
          name,
          account,
          avatar,
          followingCounts,
          followerCounts,
          cover,
          introduction,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchTweets(userId) {
      try {
        const { data } = await usersAPI.getUserTweets({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.tweets = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者推文，請稍後再試",
        });
      }
    },
    async fetchReplies(userId) {
      try {
        const { data } = await usersAPI.getUserReplies({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const replies = [];
        data.forEach((object) => (object.Tweet.id = object.id));
        data.forEach((object) => replies.push(object.Tweet));

        this.tweets = replies;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者推文，請稍後再試",
        });
      }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await usersAPI.getUserLikes({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const likes = [];
        data.forEach((object) => (object.Tweet.id = object.id));
        data.forEach((object) => likes.push(object.Tweet));

        this.tweets = likes;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者推文，請稍後再試",
        });
      }
    },
  },
};
</script> 