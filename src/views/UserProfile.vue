<template>
  <v-container class="ma-0 pa-0">
    <UserProfileCard :initial-user="user" :current-user="currentUser" />

    <!-- tabs -->
    <v-tabs
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
      background-color="transparent"
      color="primary"
    >
      <v-tab
        class="font-weight-bold"
        :to="{ name: 'user-tweets', params: { id: user.id } }"
      >
        推文
      </v-tab>
      <v-tab
        class="font-weight-bold"
        :to="{ name: 'user-replies', params: { id: user.id } }"
      >
        推文與回覆
      </v-tab>
      <v-tab
        class="font-weight-bold"
        :to="{ name: 'user-likes', params: { id: user.id } }"
      >
        喜歡的內容
      </v-tab>
    </v-tabs>
    <v-container class="ma-0 pa-0">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserTweets",
  components: {
    UserProfileCard,
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
        isFollowed: false,
      },
    };
  },
  computed: {
    ...mapState(["currentUser"]),
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
          isFollowed,
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
          isFollowed,
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