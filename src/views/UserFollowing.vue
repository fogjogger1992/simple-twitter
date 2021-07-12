<template>
  <v-container class="ma-0 pa-0">
    <!-- tabs -->
    <v-tabs
      v-model="tabs.active_tab"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
      background-color="transparent"
      color="primary"
    >
      <v-tab
        v-for="tab of tabs.tabs"
        :key="tab.id"
        :to="tab.link"
        class="font-weight-bold"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <!-- tweets list -->
    <UserCard
      v-for="following in followings"
      :key="following.id"
      :initialUser="following"
    />
  </v-container>
</template>

<script>
import UserCard from "./../components/UserCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserFollowing",
  components: {
    UserCard,
  },
  data() {
    return {
      tabs: {
        active_tab: 1,
        tabs: [
          {
            index: 0,
            name: "跟隨者",
            link: "follower",
          },
          {
            index: 1,
            name: "正在跟隨",
            link: "following",
          },
        ],
      },
      followings: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchFollowings(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchFollowings(id);
    next();
  },
  methods: {
    async fetchFollowings(userId) {
      try {
        const { data } = await usersAPI.getUserFollowings({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followings = data;
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