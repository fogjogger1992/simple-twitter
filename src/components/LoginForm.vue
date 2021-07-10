<template>
  <div>
    <v-form class="mt-4 mb-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field single-line solo v-model.trim="email" :rules="[rules.required, rules.emailRules]" maxlength="50" label="帳號"></v-text-field>
      <v-text-field single-line solo v-model.trim="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
      <v-btn rounded :disabled="!valid" color="primary" class="" @click="signIn">
        登入
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import authorizationAPI from '../apis/authorization'

export default {
  name: "LoginForm",
  data: () => ({
    valid: true,
    email: "",
    password: "",
    showPassword: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      emailRules: (value) =>
      /.+@.+\..+/.test(value) || "請使用Email登入，格式為：xxx@xxx.xx",
      // accountRules: (value) =>
      //   (value && value.length <= 50) || "帳號不得超過50個字",
    },
  }),
  methods: {
    signIn() {
      this.$refs.form.validate();

       authorizationAPI.signIn({
        email: this.email,
        password: this.password
      }).then(response => {
        // 取得 API 請求後的資料
        console.log('response', response)
      })

    },
  },
  computed: {

  },
};
</script>