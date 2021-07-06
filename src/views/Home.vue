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
        <v-card outlined tile class="pa-3">
          <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
            <v-col class="flex-grow-1">
              <v-avatar class="mt-1">
                <img :src="user.image" :alt="user.name" />
              </v-avatar>
            </v-col>
            <v-col cols="11" class="flex-shrink-1">
              <v-container fluid class="pa-0 ma-0">
                <form @submit.stop.prevent="postTweet">
                  <v-textarea
                    v-model="text.value"
                    class="pa-0 ma-0"
                    flat
                    solo
                    no-resize
                    auto-grow
                    counter="140"
                    maxlength="140"
                    rows="2"
                    label="有什麼新鮮事？"
                    :rules="[
                      text.rules.required,
                      text.rules.tweetRules,
                      text.rules.spaceRules,
                    ]"
                    :value="text.value"
                    required
                  ></v-textarea>
                  <v-card-actions class="pa-0 ma-0">
                    <v-spacer></v-spacer>
                    <v-btn type="submit" rounded color="primary"> 推文 </v-btn>
                  </v-card-actions>
                </form>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
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
  },
  data() {
    return {
      user: {
        account: "",
        name: "",
        image: "",
      },
      text: {
        rules: {
          required: (value) => !!value || "填寫您的推文",
          tweetRules: (value) =>
            (value && value.length <= 140) || "推文字數限制(140)",
          spaceRules: (v) =>
            /[^\s\d]/.test(v) || "填寫您的推文，輸入空格外的文字",
        },
        value: "",
      },
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
    postTweet() {
      console.log(this.text.value);
    },
  },
};
</script> 