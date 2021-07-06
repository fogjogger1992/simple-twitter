<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" class="sidenavcol pa-0">
        <SideNavBar :user="user" />
      </v-col>
      <v-col cols="12" sm="6" class="pa-0">
        <!-- top nav -->
        <v-card outlined tile class="pa-3">首頁</v-card>
        <!-- add tweet -->
        <NewTweetCard :user="user" @after-create-tweet="afterCreateTweet" />
        <!-- tweet list -->
      </v-col>
      <v-col cols="12" sm="3" class="black"></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
* {
  font-weight: 900;
  font-size: 18px;
}
</style>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import NewTweetCard from "./../components/NewTweetCard.vue";
// remove this after integrating API
const dummyData = {
  currentUser: {
    account: "foo",
    name: "foo",
    image: "https://i.pravatar.cc/300",
  },
};

export default {
  name: "Home",
  components: {
    SideNavBar,
    NewTweetCard,
  },
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
  },
  methods: {
    // TODO: 向後端API拉取資料
    fetchUser() {
      const { account, name, image } = dummyData.currentUser;
      this.user.account = account;
      this.user.name = name;
      this.user.image = image;
    },
    // TODO: 新增推文
    afterCreateTweet(payload) {
      const { tweetId, text } = payload;
      this.tweets.push({
        id: tweetId,
        text: text,
        User: {
          account: this.user.account,
          name: this.user.name,
          image: this.user.image,
        },
        createdAt: new Date(),
      });
    },
  },
};
</script> 