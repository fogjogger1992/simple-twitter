<template>
  <v-card outlined tile class="pa-3">
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <v-col class="flex-grow-1">
        <v-avatar class="mt-1">
          <img :src="user.image" :alt="user.name" />
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
              <v-btn type="submit" rounded color="primary"> 推文 </v-btn>
            </v-card-actions>
          </form>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "NewTweetCard",
  props: {
    user: {
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
          /[^\s\d]/.test(v) || "填寫您的推文，輸入空格外的文字",
      },
      value: "",
    };
  },
  methods: {
    handleSubmit() {
      // TODO: 向 API 發送 POST 請求
      // 伺服器新增 Tweet 成功後...
      this.$emit("after-create-tweet", {
        tweetId: 22, // 尚未串接 API 暫時使用隨機的 id
        text: this.value,
      });
      this.value = ""; // 將表單內的資料清空
    },
  },
};
</script> 