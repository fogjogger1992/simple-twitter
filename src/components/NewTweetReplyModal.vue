<template>
  <v-row justify="center">
    <v-dialog v-model="tweetReplyDialogOpen" persistent max-width="550px">
      <v-card>
        <v-card-title class="pa-2">
          <v-btn icon color="primary" @click="setTweetReplyDialogOpen(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-2">
          <v-container class="pa-0">
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img :src="tweetInfo.User.avatar" alt="Avatar">
                  </v-img>
                </v-avatar>
              </v-col>

              <v-col cols="10">
                <span class="text-body-2">{{tweetInfo.User.name}}</span>
                <span class="ml-2 text-body-2 grey--text text--darken-1"> @{{tweetInfo.User.account}} • {{tweetInfo.createdAt | fromNow}} </span>
                <v-spacer></v-spacer>
                <div class="text-body-2 grey--text text--darken-3 mt-3">
                  {{tweetInfo.description}}
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-divider inset></v-divider>
          <v-container class="pa-0 mt-4">
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img :src="currentUser.avatar" alt="Avatar">
                  </v-img>
                </v-avatar>
              </v-col>

              <v-col cols="10">
                <div class="mt-2">回覆給 <span class="primary--text"> @{{tweetInfo.User.account}}</span></div>
                <v-form ref="form" v-model="valid">
                  <v-textarea label="推你的回覆" v-model="comment" counter="140" maxlength="140" :rules="[rules.required, rules.tweetRules, rules.spaceRules]" required></v-textarea>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-3" rounded small depressed :disabled="!valid" :loading="btnLoading" @click="replyTweet">
            回覆
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import repliesAPI from "../apis/replies";
import { fromNowFilter } from "../utils/mixins";
import { mapState, mapActions, mapMutations } from "vuex";
import { Toast } from "../utils/helpers.js";

export default {
  props: {
    // tweetReplyDialogOpen: {
    //   type: Boolean,
    // },
  },
  mixins: [fromNowFilter],
  data: () => ({
    valid: true,
    comment: "",

    btnLoading: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      tweetRules: (value) =>
        (value && value.length <= 140) || "回文不得超過140個字",
      spaceRules: (v) => /[^\s\d]/.test(v) || "必填，不能只輸入空格",
    },
  }),
  async created() {
    try {
      await this.fetchCurrentUser();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async replyTweet() {
      // 新增回覆
      try {
        this.btnLoading = true;
        const replyData = {
          userId: this.currentUser.id,
          comment: this.comment,
        };
        const { data } = await repliesAPI.createReply({
          tweetId: this.tweetInfo.id,
          replyData,
        });

        this.btnLoading = false;
        if (data.status !== "success") {
          Toast.fire({
            icon: "error",
            title: `回覆失敗，，${data.message}`,
          });
          throw new Error(data.message);
        }

        this.setTweetReplyDialogOpen(false);
        Toast.fire({
          icon: "success",
          title: "回覆成功",
        });
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
      }
    },
    ...mapActions({
      fetchCurrentUser: "fetchCurrentUser",
    }),
    ...mapMutations({
      setTweetReplyDialogOpen: "tweets/setTweetReplyDialogOpen",
    }),
  },
  computed: {
    ...mapState({
      tweetInfo: (state) => state.tweets.tweetInfo,
      currentUser: (state) => state.currentUser,
      tweetReplyDialogOpen: (state) =>
        state.tweets.tweetReplyDialogOpen,
    }),
  },
};
</script>
<style>
</style>