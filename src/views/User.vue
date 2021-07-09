<template>
  <v-container class="ma-0 pa-0">
    <!-- top nav -->
    <v-card
      tile
      flat
      class="px-3 py-1 align-center"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
    >
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
    <!-- profile card -->
    <v-card tile flat class="pa-0 profilecard">
      <!-- bg -->
      <v-row height="200px" class="ma-0 pa-0">
        <v-img height="200px" :src="user.background"></v-img>
      </v-row>
      <!-- avatar & btn -->
      <v-row height="140px" class="ma-0 px-3 py-0 avatarnbtn">
        <!-- avatar -->
        <v-col cols="6" class="ma-0 pa-0">
          <v-avatar
            white
            height="140px"
            width="140px"
            style="border: 5px solid white"
          >
            <v-img :src="user.image"></v-img>
          </v-avatar>
        </v-col>
        <!-- btn -->
        <v-col cols="6" class="d-flex ma-0 px-0 py-4 align-self-end">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            rounded
            large
            color="primary"
            class="font-weight-bold"
          >
            編輯個人資料
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <!-- info -->
    <v-card tile flat height="70px"></v-card>
    <v-row class="ma-0 pa-3">
      <v-col cols="12" class="ma-0 pa-0">
        <h3>{{ user.name }}</h3>
      </v-col>
      <v-col sold="12" class="ma-0 pa-0">
        <p class="subtitle-2 grey--text font-weight-normal my-0 pa-0">
          @{{ user.account }}
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" class="py-0 px-3 ma-0">
      <p class="subtitle-2 font-weight-regular mr-1 my-0 pa-0">
        {{ user.description }}
      </p>
    </v-row>
    <!-- followings & followers -->
    <v-row no-gutters align="center" class="pa-3 ma-0">
      <p class="subtitle-2 font-weight-bold my-0 pa-0">
        {{ followings.length }} 個
      </p>
      <p class="subtitle-2 grey--text font-weight-bold mr-1 my-0 pa-0">
        跟隨中
      </p>
      <p class="subtitle-2 font-weight-bold my-0 pa-0">
        {{ followers.length }} 位
      </p>
      <p class="subtitle-2 grey--text font-weight-bold my-0 pa-0">跟隨者</p>
    </v-row>

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

<style scoped>
.profilecard {
  position: relative;
}
.avatarnbtn {
  z-index: 99;
  position: absolute;
  bottom: -70px;
  width: 100%;
}
</style>

<script>
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
  name: "User",
  components: {
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