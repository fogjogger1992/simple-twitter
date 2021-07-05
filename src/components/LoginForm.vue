<template>
  <div>
    <v-form class="mt-4 mb-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field single-line solo v-model="account" :rules="[rules.required]" maxlength="20" label="帳號"></v-text-field>
      <v-text-field single-line solo v-model="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
      <v-btn rounded :disabled="!valid" color="primary" class="" @click="signIn">
        登入
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
  data: () => ({
    valid: true,
    password: "",
    account: "",
    showPassword: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      // accountRules: (value) =>
      //   (value && value.length <= 20) || "帳號不得超過20個字",
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