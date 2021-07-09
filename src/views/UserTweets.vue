<template>
  <v-container class="ma-0 pa-0">
    <UserProfileCard
      :user="user"
      :tweets="tweets"
      :followings="followings"
      :followers="followers"
    />

    <!-- tabs -->
    <v-tabs
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
      background-color="transparent"
      color="primary"
    >
      <v-tab class="font-weight-bold"> 推文 </v-tab>
      <v-tab class="font-weight-bold"> 推文與回覆 </v-tab>
      <v-tab class="font-weight-bold"> 喜歡的內容 </v-tab>
    </v-tabs>
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
import UserProfileCard from "../components/UserProfileCard.vue";
import TweetCard from "../components/TweetCard.vue";

// remove this after integrating API
const dummyData = {
  currentUser: {
    account: "foo",
    name: "foo",
    image: "https://i.pravatar.cc/300",
    background:
      "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    description: "hi, i'm a placeholder :D",
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
  followings: [
    {
      account: "foo2",
      name: "foo2",
      image: "https://i.pravatar.cc/300",
    },
    {
      account: "foo3",
      name: "foo3",
      image: "https://i.pravatar.cc/300",
    },
  ],
  followers: [
    {
      account: "foo2",
      name: "foo2",
      image: "https://i.pravatar.cc/300",
    },
    {
      account: "foo3",
      name: "foo3",
      image: "https://i.pravatar.cc/300",
    },
  ],
};

export default {
  name: "UserTweets",
  components: {
    UserProfileCard,
    TweetCard,
  },
  data() {
    return {
      user: {
        account: "",
        name: "",
        image: "",
        background: "",
        description: "",
      },
      tweets: [],
      followings: [],
      followers: [],
    };
  },
  created() {
    this.fetchUser();
    this.fetchTweets();
    this.fetchFollowings();
    this.fetchFollowers();
  },
  methods: {
    // TODO: 向後端API拉取資料
    fetchUser() {
      const { account, name, image, background, description } =
        dummyData.currentUser;
      this.user.account = account;
      this.user.name = name;
      this.user.image = image;
      this.user.background = background;
      this.user.description = description;
    },
    fetchTweets() {
      const tweets = dummyData.tweets;
      this.tweets = tweets;
    },
    fetchFollowings() {
      const followings = dummyData.followings;
      this.followings = followings;
    },
    fetchFollowers() {
      const followers = dummyData.followers;
      this.followers = followers;
    },
  },
};
</script> 