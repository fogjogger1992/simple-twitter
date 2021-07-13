<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <!-- avatar -->
      <v-col class="flex-grow-1">
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <v-avatar class="mt-1">
            <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img>
          </v-avatar>
        </router-link>
      </v-col>
      <!-- name and account -->
      <v-col cols="11" class="flex-shrink-1">
        <v-row no-gutters align="center" class="pa-0">
          <v-col no-gutters cols="9" class="d-flex flex-column pa-2 ma-0">
            <p class="subtitle-2 font-weight-bold ma-0 pa-0">{{ user.name }}</p>
            <p
              class="subtitle-2 grey--text font-weight-normal ma-0 pa-0"
              style="text-decoration: none"
            >
              @{{ user.account }}
            </p>
          </v-col>
          <v-spacer></v-spacer>
          <!-- btn -->
          <v-col no-gutters cols="auto" class="d-flex ma-0 pa-2">
            <v-btn
              v-if="!isFollowed"
              :loading="isLoading"
              @click.stop.prevent="addFollowing(user.id)"
              rounded
              outlined
              small
              color="primary"
            >
              跟隨
            </v-btn>
            <v-btn
              v-else
              :loading="isLoading"
              @click.stop.prevent="deleteFollowing(user.id)"
              rounded
              small
              elevation="0"
              color="primary"
            >
              正在跟隨
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          align="center"
          class="d-flex flex-wrap font-weight-normal px-2"
        >
          <v-col class="body-2 font-weight-normal text-justify my-0">
            {{ user.introduction }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "userCard",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    initialUser: {
      type: Object,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      user: {
        ...this.initialUser,
      },
      isFollowed: this.initialIsFollowed,
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
    initialIsFollowed(isFollowed) {
      this.isFollowed = isFollowed;
    },
  },
  methods: {
    async addFollowing(userId) {
      try {
        this.isLoading = true;
        // 不能跟隨自己
        if (userId === this.currentUser.id) {
          Toast.fire({
            icon: "error",
            title: "無法跟隨自己",
          });
          this.isLoading = false;
          return;
        }

        const followingId = {
          id: userId,
        };
        const { data } = await usersAPI.addFollowing({ followingId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isFollowed = true;
        this.isLoading = false;
        Toast.fire({
          icon: "success",
          title: "成功加入跟隨",
        });
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法加入跟隨，請稍後再試",
        });
      }
    },
    async deleteFollowing(followingId) {
      try {
        this.isLoading = true;
        const { data } = await usersAPI.deleteFollowing({ followingId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.$emit("after-delete-following", followingId);
        this.isFollowed = false;
        this.isLoading = false;
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
      } catch (error) {
        this.isLoading = false;
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
