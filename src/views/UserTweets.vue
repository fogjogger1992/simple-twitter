<template>
  <v-container class="ma-0 pa-0">
    <!-- tweets list -->
    <TweetCard v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
  </v-container>
</template>

<script>
import TweetCard from "../components/TweetCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserTweets",
  components: {
    TweetCard,
  },
  data() {
    return {
      tweets: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchTweets(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchTweets(id);
    next();
  },
  methods: {
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
  },
};
</script> 