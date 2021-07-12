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
      v-for="follower in followers"
      :key="follower.id"
      :initialUser="follower"
    />
  </v-container>
</template>

<script>
import UserCard from "./../components/UserCard.vue";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserFollower",
  components: {
    UserCard,
  },
  data() {
    return {
      tabs: {
        active_tab: 0,
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
      followers: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchFollowers(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchFollowers(id);
    next();
  },
  methods: {
    async fetchFollowers(userId) {
      try {
        const { data } = await usersAPI.getUserFollowers({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followers = data;
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