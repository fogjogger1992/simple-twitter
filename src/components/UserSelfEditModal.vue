<template>
  <v-row justify="center">
    <v-dialog v-model="isProfileDialogOpened" persistent max-width="550px">

      <v-card>
        <v-card-title>
          <v-btn icon color="primary" :disabled="btnLoading" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <span class="text-body-1 ml-2">編輯個人資料</span>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded small depressed :disabled="!valid" :loading="btnLoading" @click="updateInfo">
            儲存
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="pa-0">
                <v-img :src="cover | emptyImage" aspect-ratio="2" max-height="170px">
                  <v-overlay absolute color="grey" opacity="0.3">
                    <v-file-input v-model="newCover" class="d-inline-flex mr-2" prepend-icon="mdi-camera-outline" hide-input accept="image/png, image/jpeg" @change="handleCoverChange"></v-file-input>
                    <v-btn icon color="white" class="mb-3 ml-2" @click="deleteCover" v-if="currentUser.cover">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-overlay>
                </v-img>

                <div class="avatar ml-3">
                  <v-avatar size="100" class="avatar-border">
                    <v-img :src="avatar | emptyImage" alt="Avatar">
                      <v-overlay absolute color="grey" opacity="0.2">
                        <v-file-input v-model="newAvatar" class="d-inline-flex ml-3 mb-2" prepend-icon="mdi-camera-outline" hide-input accept="image/png, image/jpeg" @change="handleAvatarChange"></v-file-input>
                      </v-overlay>
                    </v-img>
                  </v-avatar>
                </div>
              </v-col>

              <v-col cols="12" class="mt-7">
                <v-form class="" ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model.trim="name" :rules="[rules.required, rules.nameRules]" label="姓名" counter="50" maxlength="50" required></v-text-field>
                  <v-textarea label="自我介紹" v-model="introduction" counter="160" maxlength="160" required></v-textarea>
                </v-form>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import usersAPI from "../apis/users";
import { mapState, mapActions } from "vuex";
import { Toast } from "../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "UserSelfEditModal",
  props: {
    isProfileDialogOpened: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  mixins: [emptyImageFilter],
  data: () => ({
    valid: true,
    id: 0,
    name: "",
    introduction: "",
    avatar: "",
    cover: "",
    newAvatar: [],
    newCover: [],

    btnLoading: false,

    // 表單驗證條件
    rules: {
      required: (value) => !!value || "必填",
      nameRules: (value) =>
        (value && value.length <= 50) || "姓名不得超過50個字",
    },
  }),
  async mounted() {
    try {
      // 取登入使用者資訊
      await this.fetchCurrentUser();
      this.id = this.currentUser.id;
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
      this.name = this.currentUser.name;
      this.introduction = this.currentUser.introduction;
    } catch (error) {
      console.log("error", error);
      console.error("can not fetch user information");
    }
  },
  methods: {
    handleAvatarChange() {
      // 刪除原本要上傳的檔案
      if (this.newAvatar === undefined)
        return (this.avatar = this.currentUser.avatar);
      if (this.newAvatar.length !== 0) {
        // 如果有選擇要上傳的檔案
        const imageURL = window.URL.createObjectURL(this.newAvatar);
        this.avatar = imageURL;
      } else {
        // 如果沒有
        this.avatar = this.currentUser.avatar;
      }
    },
    handleCoverChange() {
      if (this.newCover === undefined)
        return (this.cover = this.currentUser.cover);
      if (this.newCover.length !== 0) {
        const imageURL = window.URL.createObjectURL(this.newCover);
        this.cover = imageURL;
      } else {
        this.cover = this.currentUser.cover;
      }
    },
    async updateInfo() {
      // 表單驗證
      this.$refs.form.validate();
      try {
        this.btnLoading = true;
        // 整理要上傳更新的檔案
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("introduction", this.introduction);

        if (this.newCover.length !== 0) formData.append("cover", this.newCover);
        if (this.newAvatar.length !== 0)
          formData.append("avatar", this.newAvatar);

        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value);
        // }

        const { data } = await usersAPI.updateInfo({
          userId: this.id,
          formData,
        });
        console.log("更新結果： ", data);
        this.btnLoading = false;
        if (data.status !== "success") {
          Toast.fire({
            icon: "error",
            title: `個人資料更新失敗，${data.message}`,
          });
          throw new Error(data.message);
        }
        this.$emit("update:isProfileDialogOpened", false);
        Toast.fire({
          icon: "success",
          title: "個人資料更新成功",
        });
        // 資料更新後重整頁面
        this.reload();
        // await this.fetchCurrentUser();
        // this.avatar = this.currentUser.avatar;
        // this.cover = this.currentUser.cover;
        // this.name = this.currentUser.name;
        // this.introduction = this.currentUser.introduction;
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
      }
    },
    async deleteCover() {
      try {
        const { data } = await usersAPI.removeCover({
          userId: this.id,
        });
        if (data.status !== "success") {
          Toast.fire({
            icon: "error",
            title: `封面照刪除失敗，請稍後再試一次`,
          });
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "封面照刪除成功",
        });
        this.reload();
        // await this.fetchCurrentUser();
        // this.cover = this.currentUser.cover;
      } catch (err) {
        console.log(err);
      }
    },
    async closeDialog() {
      // 如果有更新資料，確認是否要儲存
      if (
        this.avatar !== this.currentUser.avatar ||
        this.cover !== this.currentUser.cover ||
        this.name !== this.currentUser.name ||
        this.introduction !== this.currentUser.introduction
      ) {
        const decision = await Toast.fire({
          title: "尚有未儲存之資料，確定要關閉視窗嗎？一但關閉，未存的資料將會消失。",
          icon: "warning",
          position: "center",
          confirmButtonColor: "#FF6602",
          cancelButtonColor: "#888888",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
          showCancelButton: true,
          showConfirmButton: true,
          timer: undefined,
        });
        if (decision.isConfirmed) {
          // 把還沒儲存的資料清空
          this.avatar = this.currentUser.avatar;
          this.cover = this.currentUser.cover;
          this.name = this.currentUser.name;
          this.introduction = this.currentUser.introduction;
          this.$emit("update:isProfileDialogOpened", false);
        }
      } else {
        // 如果沒更新資料，直接關閉視窗
        this.$emit("update:isProfileDialogOpened", false);
      }
    },
    ...mapActions({
      fetchCurrentUser: "fetchCurrentUser",
    }),
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUser,
    }),
  },
};
</script>
<style>
.avatar {
  margin-top: -50px;
  margin-bottom: -10px;
}

.avatar-border {
  border: 2px solid white;
}

.avatar-upload .mdi-camera-outline::before {
  content: "\F0D5D";
  color: #ffffffdc;
}
</style>