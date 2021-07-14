<template>
  <v-container class="ma-0 pa-0">
    <!-- tweets list -->
    <TweetCard
      v-for="tweet in tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
      @after-delete-like="afterDeleteLike"
    />
  </v-container>
</template>

<script>
import TweetCard from "../components/TweetCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserLikes",
  components: {
    TweetCard,
  },
  data() {
    return {
      user: {
        id: -1,
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
    this.fetchLikes(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);
    this.fetchLikes(id);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id } = data;

        this.user = {
          ...this.user,
          id,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
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
        data.forEach((object) => {
          object = {
            ...object,
            isLiked: true,
          };
          likes.push(object);
        });

        this.tweets = likes;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者推文，請稍後再試",
        });
      }
    },
    afterDeleteLike(payload) {
      const tweetId = payload;
      if (this.currentUser.id === this.user.id) {
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
      }
    },
  },
};
</script> 