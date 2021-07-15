<template>
  <v-row justify="center">
    <v-dialog v-model="tweetDialogOpen" persistent max-width="550px">
      <v-card>
        <v-card-title class="pa-2">
          <v-btn icon color="primary" :disabled="btnLoading" @click="$emit('update:tweetDialogOpen', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img :src="currentUser.avatar | emptyImage" :alt="currentUser.name">
                  </v-img>
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <v-form ref="form" v-model="valid">
                  <v-textarea v-model.trim="description" label="有什麼新鮮事？" counter="140" maxlength="140" :rules="[rules.required, rules.tweetRules, rules.spaceRules]" required></v-textarea>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-3" rounded small depressed :loading="btnLoading" :disabled="!valid" @click="postTweet">
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
import { emptyImageFilter } from "../utils/mixins";

export default {
  props: {
    tweetDialogOpen: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  mixins: [emptyImageFilter],
  data: () => ({
    valid: true,
    description: "",

    btnLoading: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      tweetRules: (value) =>
        (value && value.length <= 140) || "推文不得超過140個字",
      spaceRules: (v) => /[^\s]/.test(v) || "必填，不能只輸入空格",
    },
  }),
  watch: {
    tweetDialogOpen() {
      // 每次關閉推文視窗即復原為預設狀態
      this.description = "";
      this.resetForm();
    },
  },
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
        this.btnLoading = false;
        // console.log("新增結果： ", data);
        if (data.status !== "success") {
          Toast.fire({
            icon: "error",
            title: `推文失敗，${data.message}`,
          });
          throw new Error(data.message);
        }

        this.$emit("update:tweetDialogOpen", false);
        this.description = "";
        Toast.fire({
          icon: "success",
          title: "推文成功",
        });
        this.reload();
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
      }
    },
    resetForm() {
      if (this.$refs.form === undefined) return;
      this.$refs.form.reset();
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