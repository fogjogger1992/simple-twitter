<template>
  <v-container class="ma-0 pa-0">
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
import TweetCard from "../components/TweetCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserReplies",
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
    this.fetchReplies(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchReplies(id);
    next();
  },
  methods: {
    async fetchReplies(userId) {
      try {
        const { data } = await usersAPI.getUserReplies({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const replies = [];
        data.forEach((object) => replies.push(object.Tweet));

        this.tweets = replies;
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