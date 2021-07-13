<template>
  <v-card
    tile
    flat
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <v-col class="flex-grow-1">
        <v-avatar class="mt-1">
          <v-img :src="currentUser.avatar" :alt="currentUser.name"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="11" class="flex-shrink-1">
        <v-container fluid class="pa-0 ma-0">
          <form @submit.stop.prevent="handleSubmit">
            <v-textarea
              v-model="value"
              class="pa-0 ma-0"
              flat
              solo
              no-resize
              auto-grow
              counter="140"
              maxlength="140"
              rows="2"
              label="有什麼新鮮事？"
              :rules="[rules.required, rules.tweetRules, rules.spaceRules]"
              :value="value"
              required
            ></v-textarea>
            <v-card-actions class="pa-0 ma-0">
              <v-spacer></v-spacer>
              <v-btn :loading="isLoading" type="submit" rounded color="primary">
                推文
              </v-btn>
            </v-card-actions>
          </form>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";

export default {
  name: "NewTweetCard",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "填寫您的推文",
        tweetRules: (value) =>
          (value && value.length <= 140) || "推文字數限制(140)",
        spaceRules: (v) =>
          /[^\s]/.test(v) || "填寫您的推文，輸入空格外的文字",
      },
      value: "",
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // empty input
        if (!this.value) {
          Toast.fire({
            icon: "warning",
            title: "請寫下您的推文",
          });
          return;
          // only space
        } else if (!this.value.trim()) {
          Toast.fire({
            icon: "warning",
            title: "填寫您的推文，輸入空格外的文字",
          });
          return;
          // >140
        } else if (this.value.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文字數限制(140)",
          });
          return;
        }

        this.isLoading = true;

        const tweetData = {
          userId: this.currentUser.id,
          description: this.value,
        };

        const { data } = await tweetsAPI.createTweet({
          tweetData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 伺服器新增推文成功後...
        this.$emit("after-create-tweet", {
          tweetData,
        });
        Toast.fire({
          icon: "success",
          title: "推文成功",
        });

        // 清空已送出的推文
        this.value = "";

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試",
        });
      }
    },
  },
};
</script> 