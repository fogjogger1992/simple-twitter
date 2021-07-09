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
      :key="following.account"
      :initialUser="following"
    />
  </v-container>
</template>

<script>
import UserCard from "./../components/UserCard.vue";

// remove this after integrating API
const dummyData = {
  Users: [
    {
      account: "fooa",
      name: "fooA",
      image: "https://i.pravatar.cc/300",
      info: "Following.",
      isFollowed: true,
    },
    {
      account: "foob",
      name: "fooB",
      image: "https://i.pravatar.cc/300",
      info: "Following.",
      isFollowed: true,
    },
  ],
};

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
  created() {
    this.fetchFollowings();
  },
  methods: {
    fetchFollowings() {
      const followings = dummyData.Users;
      this.followings = followings;
    },
  },
};
</script>