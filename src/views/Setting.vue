<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="3" lg="3" style="border-right: 1px solid rgba(0, 0, 0, 0.12)">
        <SideNavBar :current-user="currentUser" />
      </v-col>

      <v-col cols="12" sm="12" md="9" lg="9" class="ma-0 px-0 d-flex flex-column">
        <v-card tile flat class="pa-3 font-weight-bold text-subtitle-1" style="border-bottom: thin solid rgba(0, 0, 0, 0.12)">帳戶設定</v-card>
        <v-col cols="12" md="7" class="ma-auto pa-4 align-self-center">
          <AlertErr :alertMsg.sync='alertMsg' v-if='alertMsg' />
          <v-form class="my-4 text-right" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model.trim="currentUser.account" :rules="[rules.required, rules.accountRules]" maxlength="50" label="帳號" disabled></v-text-field>
            <v-text-field v-model.trim="name" :rules="[rules.required, rules.nameRules]" maxlength="50" label="姓名"></v-text-field>
            <v-text-field v-model.trim="email" :rules="[rules.required, rules.emailRules]" label="Email" required></v-text-field>
            <v-text-field v-model.trim="password" maxlength="20" type='password' :rules="[rules.required, rules.passwordRules]" label="密碼"></v-text-field>
            <v-text-field v-model.trim="confirmPassword" maxlength="20" type='password' :rules="confirmPasswordRules" label="確認密碼"></v-text-field>
            <v-btn rounded :disabled="!valid" color="primary" :loading="btnLoading" @click="updateSetting">
              儲存
            </v-btn>
          </v-form>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SideNavBar from "@/components/SideNavBar";
import AlertErr from "@/components/AlertErr";
import usersAPI from "../apis/users";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "Setting",
  components: { SideNavBar, AlertErr },
  data: () => ({
    valid: true,
    id: 0,
    name: "",
    // account: "",
    email: "",
    password: "",
    confirmPassword: "",

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
  async created() {
    try {
      // 取登入使用者資訊
      await this.fetchCurrentUser();
      this.id = this.currentUser.id;
      this.name = this.currentUser.name;
      // this.account = this.currentUser.account;
      this.email = this.currentUser.email;
    } catch (error) {
      console.log("error", error);
      console.error("can not fetch user information");
    }
  },
  methods: {
    async updateSetting() {
      // 表單驗證
      this.$refs.form.validate();
      try {
        this.btnLoading = true;
        const userData = {
          name: this.name,
          account: this.currentUser.account,
          email: this.email,
          password: this.password,
          checkPassword: this.confirmPassword,
        };
        const { data } = await usersAPI.updateSetting({
          userId: this.id,
          userData,
        });
        this.btnLoading = false;
        // 更新失敗
        if (data.status !== "success") {
          this.alertMsg = data.message;
          throw new Error(data.message);
        }
        // 更新成功
        this.alertMsg = "";
        this.setShowPopup(true, { root: true });
        this.setPopupDetails(
          { popupColor: "green", popupMsg: "資料更新成功" },
          { root: true }
        );
        // 更新使用者資料
        await this.fetchCurrentUser();
        this.name = this.currentUser.name;
        this.email = this.currentUser.email;
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
      }
    },
    ...mapMutations({
      setShowPopup: "setShowPopup",
      setPopupDetails: "setPopupDetails",
    }),
    ...mapActions({
      fetchCurrentUser: "fetchCurrentUser",
    }),
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
    ...mapState({
      currentUser: (state) => state.currentUser,
    }),
  },
};
</script>
<style lang="">
</style>