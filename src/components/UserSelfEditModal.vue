<template>
  <v-row justify="center">
    <v-dialog v-model="isProfileDialogOpened" persistent max-width="550px">

      <v-card>
        <v-card-title>
          <v-btn icon color="primary" @click="$emit('update:isProfileDialogOpened', false)">
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
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-img :src="cover" aspect-ratio="2" max-height="170px">
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="grey">
                          <v-file-input v-model="newCover" class="d-inline-flex mr-2" prepend-icon="mdi-camera-outline" hide-input accept="image/png, image/jpeg"></v-file-input>
                          <v-btn icon color="white" class="mb-3 ml-2">
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-img>
                  </template>
                </v-hover>

                <div class="avatar ml-3">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-avatar size="100" class="avatar-border">
                        <v-img :src="avatar" alt="Avatar">
                          <v-fade-transition>
                            <v-overlay v-if="hover" absolute color="grey">
                              <v-file-input v-model="newAvatar" class="d-inline-flex ml-3 mb-2" prepend-icon="mdi-camera-outline" hide-input accept="image/png, image/jpeg"></v-file-input>
                            </v-overlay>
                          </v-fade-transition>
                        </v-img>
                      </v-avatar>
                    </template>
                  </v-hover>
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
// import usersAPI from "../apis/users";
import { mapState, mapActions } from "vuex";
// import { Toast } from "../utils/helpers";

export default {
  name: "UserSelfEditModal",
  props: {
    isProfileDialogOpened: {
      type: Boolean,
    },
  },
  data: () => ({
    valid: true,
    id: 0,
    name: "",
    introduction: "",
    avatar: "",
    cover: "",
    newAvatar: "",
    newCover: '',

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
      await this.fetchCurrentUser()
      console.log("currentUser； ", this.currentUser);
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
    async updateInfo() {
      // 表單驗證
      this.$refs.form.validate();
      try {
        this.btnLoading = true;
        const userData = {
          name: this.name,
          introduction: this.introduction,
          cover: this.newCover,
          avatar: this.newAvatar,
        };
        console.log("要更新的個人資料： ", userData);
        // const { data } = await usersAPI.updateInfo({
        //   userId: this.id,
        //   userData,
        // });
        // console.log("更新結果： ", data);
        // this.btnLoading = false;
        // // if (data.status !== "success") {
        //   Toast.fire({
        //     icon: "error",
        //     title: `個人資料更新失敗，${data.message}`,
        //   });
        //   throw new Error(data.message);
        // }

        // this.$emit("update:isProfileDialogOpened", false);
        // Toast.fire({
        //   icon: "success",
        //   title: "個人資料更新成功",
        // });
      } catch (err) {
        this.btnLoading = false;
        console.log(err);
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