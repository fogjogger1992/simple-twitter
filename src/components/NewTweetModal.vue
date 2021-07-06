<template>
  <v-row justify="center">
    <v-dialog v-model="isTweetDialogOpened" persistent max-width="550px">
      <v-card>
        <v-card-title class="pa-1">
          <v-btn icon color="primary" @click="$emit('update:isTweetDialogOpened', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Avatar">
                  </v-img>
                </v-avatar>
                 </v-col>
                 <v-col cols="10">
                <v-form ref="form" v-model="valid">
                  <v-textarea label="有什麼新鮮事？" counter="140" maxlength="140" :rules="[rules.required, rules.tweetRules, rules.spaceRules]" required>{{tweet.trim}}</v-textarea>
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
export default {
  props: {
    isTweetDialogOpened: {
      type: Boolean,
    },
  },
  data: () => ({
    valid: true,
    tweet: "",

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      tweetRules: (value) =>
        (value && value.length <= 140) || "推文不得超過140個字",
      spaceRules:  (v) => /[^\s\d]/.test(v) || "必填，不能只輸入空格",
    },
  }),
  methods: {
    postTweet() {
      this.$emit("update:isTweetDialogOpened", false);
    },
  },
};
</script>
<style>
</style>