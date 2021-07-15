<template>
  <v-container class="ma-0 pa-0">
    <!-- profile card -->
    <v-card
      tile
      flat
      class="pa-0 profilecard"
      style="border-top: thin solid rgba(0, 0, 0, 0.12)"
    >
      <!-- bg -->
      <v-row height="200px" class="ma-0 pa-0">
        <v-img height="200px" :src="user.cover | emptyImage"></v-img>
      </v-row>
      <!-- avatar & btn -->
      <v-row height="140px" class="ma-0 px-3 py-0 avatarnbtn">
        <!-- avatar -->
        <v-col cols="6" class="ma-0 pa-0">
          <v-avatar
            white
            height="140px"
            width="140px"
            style="border: 5px solid white"
          >
            <v-img :src="user.avatar | emptyImage"></v-img>
          </v-avatar>
        </v-col>
        <!-- btn -->
        <v-col cols="6" class="d-flex ma-0 px-0 py-4 align-self-end">
          <v-spacer></v-spacer>
          <!-- if currentUserId === userId -->
          <v-btn
            v-if="user.id === currentUser.id"
            @click.stop.prevent="openUserSelfEditModal"
            outlined
            rounded
            color="primary"
            class="font-weight-bold"
          >
            編輯個人資料
          </v-btn>
          <!-- else -->
          <div v-else>
            <v-btn
              fab
              small
              outlined
              color="primary"
              class="mr-2"
              style="height: 36px; width: 36px"
            >
              <v-icon color="primary" style="font-size: 1.2rem">
                far fa-envelope
              </v-icon>
            </v-btn>
            <v-btn
              fab
              small
              outlined
              color="primary"
              class="mr-2"
              style="height: 36px; width: 36px"
            >
              <v-icon color="primary" style="font-size: 1.2rem">
                far fa-bell
              </v-icon>
            </v-btn>
            <!-- if !isFollowed -->
            <v-btn
              v-if="!user.isFollowed"
              :loading="isLoading"
              @click.stop.prevent="addFollowing(user.id)"
              outlined
              rounded
              color="primary"
              class="font-weight-bold"
            >
              跟隨
            </v-btn>
            <!-- else -->
            <v-btn
              v-else
              :loading="isLoading"
              @click.stop.prevent="deleteFollowing(user.id)"
              elevation="0"
              rounded
              color="primary"
              class="font-weight-bold"
            >
              正在跟隨
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <!-- info -->
    <v-card tile flat height="70px"></v-card>
    <v-row class="ma-0 pa-3">
      <v-col cols="12" class="ma-0 pa-0">
        <h3>{{ user.name }}</h3>
      </v-col>
      <v-col sold="12" class="ma-0 pa-0">
        <p class="subtitle-2 grey--text font-weight-normal my-0 pa-0">
          @{{ user.account }}
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" class="py-0 px-3 ma-0">
      <p class="subtitle-2 font-weight-regular mr-1 my-0 pa-0">
        {{ user.introduction }}
      </p>
    </v-row>
    <!-- followings & followers -->
    <v-row no-gutters align="center" class="pa-3 ma-0">
      <router-link
        :to="{ name: 'user-following', params: { id: user.id } }"
        style="text-decoration: none"
      >
        <p class="subtitle-2 font-weight-bold black--text my-0 pa-0">
          {{ user.followingCounts }} 個
        </p>
      </router-link>
      <p class="subtitle-2 grey--text font-weight-bold mr-1 my-0 pa-0">
        跟隨中
      </p>
      <router-link
        :to="{ name: 'user-follower', params: { id: user.id } }"
        style="text-decoration: none"
      >
        <p class="subtitle-2 font-weight-bold black--text my-0 pa-0">
          {{ user.followerCounts }} 位
        </p>
      </router-link>
      <p class="subtitle-2 grey--text font-weight-bold my-0 pa-0">跟隨者</p>
    </v-row>
    <UserSelfEditModal :isProfileDialogOpened.sync="isProfileDialogOpened" />
  </v-container>
</template>

<style scoped>
.profilecard {
  position: relative;
}
.avatarnbtn {
  z-index: 99;
  position: absolute;
  bottom: -70px;
  width: 100%;
}
</style>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import UserSelfEditModal from "@/components/UserSelfEditModal.vue";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapMutations } from "vuex";

export default {
  name: "UserProfileCard",
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserSelfEditModal,
  },
  data() {
    return {
      user: {
        ...this.initialUser,
      },
      // 個人資料編輯視窗
      isProfileDialogOpened: false,
      isLoading: false,
    };
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
  },
  methods: {
    openUserSelfEditModal() {
      this.isProfileDialogOpened = true;
    },
    ...mapMutations({
      setfollowshipUpdate: "setfollowshipUpdate",
    }),
    async addFollowing(userId) {
      try {
        this.isLoading = true;
        this.setfollowshipUpdate(null, { root: true });
        // 不能跟隨自己
        if (userId === this.currentUser.id) {
          Toast.fire({
            icon: "error",
            title: "無法跟隨自己",
          });
          this.isLoading = false;
          this.setfollowshipUpdate(null, { root: true });
          return;
        }

        const followingId = {
          id: userId,
        };
        const { data } = await usersAPI.addFollowing({ followingId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.user.isFollowed = true;
        this.user.followerCounts += 1;
        this.isLoading = false;
        this.setfollowshipUpdate(null, { root: true });
        Toast.fire({
          icon: "success",
          title: "成功加入跟隨",
        });
      } catch (error) {
        this.isLoading = false;
        this.setfollowshipUpdate(null, { root: true });
        Toast.fire({
          icon: "error",
          title: "無法加入跟隨，請稍後再試",
        });
      }
    },
    async deleteFollowing(followingId) {
      try {
        this.isLoading = true;
        this.setfollowshipUpdate(null, { root: true });
        const { data } = await usersAPI.deleteFollowing({ followingId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.user.isFollowed = false;
        this.user.followerCounts -= 1;
        this.isLoading = false;
        this.setfollowshipUpdate(null, { root: true });
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
      } catch (error) {
        this.isLoading = false;
        this.setfollowshipUpdate(null, { root: true });
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        });
      }
    },
  },
};
</script>
