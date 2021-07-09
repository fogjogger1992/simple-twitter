<template>
  <v-row justify="center">
    <v-dialog v-model="isTweetReplyDialogOpened" persistent max-width="550px">
      <v-card>
        <v-card-title class="pa-2">
          <v-btn icon color="primary" @click="$emit('update:isTweetReplyDialogOpened', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-2">
          <v-container class="pa-0">
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Avatar">
                  </v-img>
                </v-avatar>
              </v-col>

              <v-col cols="10">
                <span class="text-body-2">User1</span>
                <span class="ml-2 text-body-2 grey--text text--darken-1"> @user1 • 3hr </span>
                <v-spacer></v-spacer>
                <div class="text-body-2 grey--text text--darken-3 mt-3">
                  "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                  "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                  "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
       
        <v-card-text>
         <v-divider inset></v-divider>
          <v-container class="pa-0 mt-4">
            <!-- <v-divider inset></v-divider> -->
            <v-row>
              <v-col cols="2">
                <v-avatar size="60" class="avatar-border">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Avatar">
                  </v-img>
                </v-avatar>
              </v-col>

              <v-col cols="10">
                <div class="mt-2">回覆給 <span class="primary--text"> @User1 </span></div>
                <v-form ref="form" v-model="valid">
                  <v-textarea label="推你的回覆" counter="140" maxlength="140" :rules="[rules.required, rules.tweetRules, rules.spaceRules]" required>{{comment}}</v-textarea>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-3" rounded small depressed :disabled="!valid" @click="replyTweet">
            回覆
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    isTweetReplyDialogOpened: {
      type: Boolean,
    },
  },
  data: () => ({
    valid: true,
    comment: "",

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      tweetRules: (value) =>
        (value && value.length <= 140) || "回文不得超過140個字",
      spaceRules: (v) => /[^\s\d]/.test(v) || "必填，不能只輸入空格",
    },
  }),
  methods: {
    replyTweet() {
      this.$emit("update:isTweetReplyDialogOpened", false);
    },
  },
};
</script>
<style>
</style>