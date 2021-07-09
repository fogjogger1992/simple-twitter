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
      :key="follower.account"
      :initialUser="follower"
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
      info: "Hi, I am fooA. I am a follower. lol",
      isFollowed: true,
    },
    {
      account: "foob",
      name: "fooB",
      image: "https://i.pravatar.cc/300",
      info: "Hi, I am fooB.  I am a follower, too. lol",
      isFollowed: false,
    },
  ],
};

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
  created() {
    this.fetchFollowers();
  },
  methods: {
    fetchFollowers() {
      const followers = dummyData.Users;
      this.followers = followers;
    },
  },
};
</script>