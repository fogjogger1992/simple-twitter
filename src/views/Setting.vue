<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        style="border-right: 1px solid rgba(0, 0, 0, 0.12)"
      >
        <SideNavBar :current-user="currentUser" />
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="9"
        lg="9"
        class="ma-0 px-0 d-flex flex-column"
      >
        <v-card
          tile
          flat
          class="pa-3 font-weight-bold text-subtitle-1"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
          >帳戶設定</v-card
        >
        <v-col cols="12" md="7" class="ma-auto pa-4 align-self-center">
          <v-form
            class="my-4 text-right"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <UserInfoForm />
            <!-- <v-text-field v-model="password" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.passwordRules]" :type="showPassword ? 'text' : 'password'" label="密碼" @click:append="showPassword = !showPassword"></v-text-field>
          <v-text-field v-model.trim="confirmPassword" maxlength="20" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="confirmPasswordRules" :type="showPassword ? 'text' : 'password'" label="確認密碼" @click:append="showPassword = !showPassword"></v-text-field>
          <v-text-field v-model.trim="email" :rules="[rules.required, rules.emailRules]" label="Email" required></v-text-field>
          <v-text-field v-model.trim="name" :rules="[rules.required, rules.nameRules]" maxlength="50" label="姓名"></v-text-field>
          <v-text-field v-model.trim="account" :rules="[rules.required, rules.accountRules]" maxlength="50" label="帳號"></v-text-field> -->
            <v-btn
              rounded
              :disabled="!valid"
              color="primary"
              class=""
              @click="save"
            >
              儲存
            </v-btn>
          </v-form>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserInfoForm from "@/components/UserInfoForm";
import SideNavBar from "@/components/SideNavBar";
import { mapState } from "vuex";

export default {
  name: "Setting",
  components: { UserInfoForm, SideNavBar },
  data: () => ({
    valid: true,
    // password: "",
    // confirmPassword: "",
    // name: "",
    // account: "",
    // email: "",
    // showPassword: false,

    // 表單驗證條件
    // rules: {
    //   required: (value) => !!value || "必填",
    //   accountRules: (value) =>
    //     (value && value.length <= 50) || "帳號不得超過50個字",
    //   nameRules: (value) =>
    //     (value && value.length <= 50) || "姓名不得超過50個字",
    //   emailRules: (value) =>
    //     /.+@.+\..+/.test(value) || "Email格式無效，應為：xxx@xxx.xx",
    //   passwordRules: (value) =>
    //     (value && value.length <= 20) || "密碼不得超過20個字",
    // },
  }),
  methods: {
    save() {
      this.$refs.form.validate();
    },
  },
  computed: {
    ...mapState(["currentUser"]),
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
<style lang="">
</style>