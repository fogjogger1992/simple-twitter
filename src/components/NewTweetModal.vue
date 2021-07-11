<template>
  <v-row justify="center">
    <v-dialog v-model="isTweetDialogOpened" persistent max-width="550px">
      <v-card>
        <v-card-title class="pa-2">
          <v-btn icon color="primary" @click="$emit('update:isTweetDialogOpened', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img :src="currentUser.avatar" :alt="currentUser.name">
                  </v-img>
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <v-form ref="form" v-model="valid">
                  <v-textarea v-model="description" label="有什麼新鮮事？" counter="140" maxlength="140" :rules="[rules.required, rules.tweetRules, rules.spaceRules]" required></v-textarea>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-3" rounded small depressed :disabled="!valid" @click="postTweet">
            推文
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import tweetsAPI from "../apis/tweets";
import { mapActions, mapState } from "vuex";
import { Toast } from "../utils/helpers";

export default {
  props: {
    isTweetDialogOpened: {
      type: Boolean,
    },
  },
  data: () => ({
    valid: true,
    description: "",

    btnLoading: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      tweetRules: (value) =>
        (value && value.length <= 140) || "推文不得超過140個字",
      spaceRules: (v) => /[^\s\d]/.test(v) || "必填，不能只輸入空格",
    },
  }),
  methods: {
    async postTweet() {
      try {
        this.btnLoading = true;
        await this.fetchCurrentUser();

        const tweetData = {
          userId: this.currentUser.id,
          description: this.description,
        };
        const { data } = await tweetsAPI.createTweet({ tweetData });

        console.log("新增結果： ", data);
        if (data.status !== "success") {
          Toast.fire({
            icon: "error",
            title: `推文失敗，${data.message}`
          });
          throw new Error(data.message);
        }

        this.$emit("update:isTweetDialogOpened", false);
        Toast.fire({
          icon: "success",
          title: "推文成功"
        });
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
      }
    },
    ...mapActions({
      fetchCurrentUser: "fetchCurrentUser",
    }),
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUser,
    }),
  },
};
</script>
<style>
</style>