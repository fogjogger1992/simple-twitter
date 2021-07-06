<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="5" class="text-center">
        <img src="../assets/img/logo.svg">
        <p class="text--h6 font-weight-bold mt-4">建立你的帳號</p>

        <v-form class="my-4" ref="form" v-model="valid" lazy-validation>
          <UserInfoForm />
          <!-- <v-text-field single-line solo v-model="account" :rules="[rules.required, rules.accountRules]" maxlength="20" label="帳號"></v-text-field>
          <v-text-field single-line solo v-model="name" :rules="[rules.required, rules.nameRules]" maxlength="50" label="姓名"></v-text-field>
          <v-text-field single-line solo v-model="email" :rules="[rules.required, rules.emailRules]" label="Email" required></v-text-field>
          <v-text-field single-line solo v-model="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.passwordRules]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
          <v-text-field single-line solo v-model="confirmPassword" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="confirmPasswordRules" :type="showPassword ? 'text' : 'password'" label="確認密碼" @click:append="showPassword = !showPassword"></v-text-field> -->
          <v-btn rounded :disabled="!valid" color="primary" class="" @click="signUp">
            註冊
          </v-btn>
        </v-form>
        <router-link class="text-subtitle-2 secondary--text font-weight-bold" to="/">取消</router-link>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserInfoForm from "@/components/UserInfoForm";

export default {
  name: "SignUp",
  components: { UserInfoForm },
  data: () => ({
    valid: true,
    password: "",
    confirmPassword: "",
    name: "",
    account: "",
    email: "",
    showPassword: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      accountRules: (value) =>
        (value && value.length <= 20) || "帳號不得超過20個字",
      nameRules: (value) =>
        (value && value.length <= 50) || "姓名不得超過50個字",
      emailRules: (value) =>
        /.+@.+\..+/.test(value) || "Email格式無效，應為：xxx@xxx.xx",
      passwordRules: (value) =>
        (value && value.length <= 20) || "密碼不得超過20個字",
    },
  }),
  methods: {
    signUp() {
      this.$refs.form.validate();
    },
  },
  computed: {
    confirmPasswordRules() {
      // 確認密碼驗證
      const rules = [
        (value) => !!value || "必填",
        (value) => value.length <= 20 || "密碼不得超過20個字",
        this.password === this.confirmPassword || "兩次輸入的密碼不同",
      ];
      return rules;
    },
  },
};
</script>