<template>
  <div>
    <v-text-field single-line solo v-model="account" :rules="[rules.required, rules.accountRules]" maxlength="20" label="帳號"></v-text-field>
    <v-text-field single-line solo v-model="name" :rules="[rules.required, rules.nameRules]" maxlength="50" label="姓名"></v-text-field>
    <v-text-field single-line solo v-model="email" :rules="[rules.required, rules.emailRules]" label="Email" required></v-text-field>
    <v-text-field single-line solo v-model="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.passwordRules]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
    <v-text-field single-line solo v-model="confirmPassword" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="confirmPasswordRules" :type="showPassword ? 'text' : 'password'" label="確認密碼" @click:append="showPassword = !showPassword"></v-text-field>
  </div>
</template>
<script>
export default {
  name: "Setting",
  data: () => ({
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