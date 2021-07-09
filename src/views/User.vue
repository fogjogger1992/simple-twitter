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
            {{ tweets.length }} 貼文
          </p>
        </v-col>
      </v-row>
    </v-card>
    <!-- user profile / following / follower -->
    <v-container class="ma-0 pa-0">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>

<script>
// remove this after integrating API
const dummyData = {
  currentUser: {
    account: "foo",
    name: "foo",
    image: "https://i.pravatar.cc/300",
  },
  tweets: [
    {
      id: 1,
      text: "text text text text text text text text text text text text text text text",
      createdAt: "2019-06-22T09:00:43.000Z",
      User: {
        account: "foo",
        name: "foo",
        image: "https://i.pravatar.cc/300",
      },
      LikedUsers: [
        {
          account: "77",
          name: "888",
          image: "https://i.pravatar.cc/300",
        },
        {
          account: "88",
          name: "777",
          image: "https://i.pravatar.cc/300",
        },
      ],
      Replies: [
        {
          id: 1,
          text: "1111",
          createdAt: "2020-06-22T09:00:43.000Z",
        },
        {
          id: 2,
          text: "1111",
          createdAt: "2020-06-22T09:00:43.000Z",
        },
        {
          id: 3,
          text: "1111",
          createdAt: "2020-06-22T09:00:43.000Z",
        },
      ],
    },
    {
      id: 2,
      text: "22222",
      createdAt: "2020-06-22T09:00:43.000Z",
      User: {
        account: "foo",
        name: "foo",
        image: "https://i.pravatar.cc/300",
      },
      LikedUsers: [],
      Replies: [],
    },
    {
      id: 3,
      text: "333",
      createdAt: "2021-06-22T09:00:43.000Z",
      User: {
        account: "foo",
        name: "foo",
        image: "https://i.pravatar.cc/300",
      },
      LikedUsers: [],
      Replies: [],
    },
  ],
};

export default {
  name: "User",
  data() {
    return {
      user: {
        account: "",
        name: "",
        image: "",
      },
      tweets: [],
    };
  },
  created() {
    this.fetchUser();
    this.fetchTweets();
  },
  methods: {
    // TODO: 向後端API拉取資料
    fetchUser() {
      const { account, name, image } = dummyData.currentUser;
      this.user.account = account;
      this.user.name = name;
      this.user.image = image;
    },
    fetchTweets() {
      const tweets = dummyData.tweets;
      this.tweets = tweets;
    },
  },
};
</script> 