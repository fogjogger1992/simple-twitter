<template>
  <v-container class="ma-0 pa-0">
    <!-- top nav -->
    <v-card tile flat class="px-3 py-1 align-center">
      <v-row no-gutters class="ma-0 pa-0 align-center">
        <v-col cols="1" class="ma-0 pa-0">
          <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
        </v-col>
        <v-col cols="auto" class="ma-0 pa-0">
          <h3>{{ user.name }}</h3>
          <p class="subtitle-2 grey--text font-weight-normal my-0 pa-0">
            {{ user.tweetCounts }} 貼文
          </p>
        </v-col>
      </v-row>
    </v-card>
    <!-- user profile / following / follower -->
    <v-container class="ma-0 pa-0 userdetail">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>

<style scoped>
.userdetail {
  height: calc(100vh - 61.58333px);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.userdetail::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "User",
  data() {
    return {
      user: {
        id: -1,
        name: "",
        account: "",
        tweetCounts: 0,
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);

    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId });
        const tweetsData = await usersAPI.getUserTweets({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id, name, account } = data;
        this.user = {
          ...this.user,
          id,
          name,
          account,
          tweetCounts: tweetsData.data.length,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script> 