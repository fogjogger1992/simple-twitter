<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="5" class="text-center">
        <p class="text--h6 font-weight-bold mt-4">登入Alphitter</p>

        <v-form class="mt-4 mb-5" ref="form" v-model="valid" lazy-validation>
          <v-text-field single-line solo v-model="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
          <v-text-field single-line solo v-model="account" :rules="[rules.required, rules.accountRules]" maxlength="20" label="帳號"></v-text-field>
          <v-btn rounded :disabled="!valid" color="primary" class="" @click="signIn">
            登入
          </v-btn>
        </v-form>
        <div class="text-right">
        <router-link class="text-subtitle-2 secondary--text font-weight-bold" to="/signup">註冊</router-link><span class="grey--text"> | </span>
        <router-link class="text-subtitle-2 secondary--text font-weight-bold" to="/admin/signin">後台登入</router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "SignIn",
  data: () => ({
    valid: true,
    password: "",
    account: "",
    showPassword: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      accountRules: (value) =>
        (value && value.length <= 20) || "帳號不得超過20個字",
      // emailRules: (value) =>
      //   /.+@.+\..+/.test(value) || "Email格式無效，應為：xxx@xxx.xx",
 
    },
  }),
  methods: {
    signIn() {
      this.$refs.form.validate();
    },
  },
  computed: {

  },
};
</script>