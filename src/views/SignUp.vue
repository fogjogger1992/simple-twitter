<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="5" class="text-center">
        <v-img src="../assets/img/logo.svg" max-width="35" class="ma-auto"></v-img>
        <p class="text--h6 font-weight-bold mt-4">建立你的帳號</p>

        <AlertErr :alertMsg.sync='alertMsg' v-if='alertMsg' />
        <v-form class="my-4" ref="form" v-model="valid" lazy-validation>
          <v-text-field single-line solo v-model.trim="account" :rules="[rules.required, rules.accountRules]" maxlength="50" label="帳號"></v-text-field>
          <v-text-field single-line solo v-model.trim="name" :rules="[rules.required, rules.nameRules]" maxlength="50" label="姓名"></v-text-field>
          <v-text-field single-line solo v-model.trim="email" :rules="[rules.required, rules.emailRules]" label="Email" required></v-text-field>
          <v-text-field single-line solo v-model.trim="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.passwordRules]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
          <v-text-field single-line solo v-model.trim="confirmPassword" maxlength="20" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="confirmPasswordRules" :type="showConfirmPassword ? 'text' : 'password'" label="確認密碼" @click:append="showConfirmPassword = !showConfirmPassword"></v-text-field>

          <v-btn rounded :disabled="!valid" :loading="btnLoading" color="primary" @click="signUp">
            註冊
          </v-btn>
        </v-form>
        <router-link class="text-subtitle-2 secondary--text font-weight-bold" to="/">取消</router-link>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AlertErr from "@/components/AlertErr";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "SignUp",
  components: { AlertErr },
  data: () => ({
    valid: true,
    name: "",
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,

    alertMsg: "",

    btnLoading: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      accountRules: (value) =>
        (value && value.length <= 50) || "帳號不得超過50個字",
      nameRules: (value) =>
        (value && value.length <= 50) || "姓名不得超過50個字",
      emailRules: (value) =>
        /.+@.+\..+/.test(value) || "Email格式無效，應為：xxx@xxx.xx",
      passwordRules: (value) =>
        (value && value.length <= 20) || "密碼不得超過20個字",
    },
  }),
  methods: {
    async signUp() {
      this.$refs.form.validate();
      try {
        this.btnLoading = true;
        const userData = {
          name: this.name,
          account: this.account,
          email: this.email,
          password: this.password,
          checkPassword: this.confirmPassword,
        };
        const { data } = await userAPI.signup({
          userData,
        });
        // console.log("data: ", data);
        this.btnLoading = false;
        if (data.status !== "success") {
          this.alertMsg = data.message;
          throw new Error(data.message);
        }
        this.alertMsg = "";
        Toast.fire({
          icon: "success",
          title: "註冊成功",
        });
        setTimeout(() => this.$router.push("/signin"), 1000);
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
      }
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