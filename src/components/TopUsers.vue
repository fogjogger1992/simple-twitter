<template>
  <v-row class="justify-center ma-0 pa-0">
    <v-col cols="12" md="10" class="mt-5 pa-0">
      <v-card flat class="mx-auto grey lighten-3 rounded-lg">
        <v-card-title class="py-2">
          <span class="font-weight-bold" style="font-size: 18px">跟隨誰</span>
        </v-card-title>
        <v-divider></v-divider>
        <!-- users list -->
        <v-card-actions
          v-for="userIndex in usersToShow"
          :key="topUsers[userIndex - 1].id"
          style="
            border-bottom: thin solid rgba(0, 0, 0, 0.12);
            font-weight: 500;
          "
        >
          <v-list-item>
            <v-row no-gutters class="pa-0 ma-0 d-flex flex-wrap">
              <!-- img -->
              <v-col
                cols="auto"
                class="pa-0 ma-0 flex-shrink-1"
                style="min-width: 40px"
              >
                <v-list-item-avatar>
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="topUsers[userIndex - 1].avatar | emptyImage"
                  ></v-img>
                </v-list-item-avatar>
              </v-col>
              <!-- account and btn -->
              <v-col cols="auto" class="flex-grow-1 pa-0 ma-0">
                <v-row class="d-flex flex-wrap align-center ma-0 pa-0">
                  <!-- account -->
                  <v-col cols="auto" class="pa-0 ma-0">
                    <v-list-item-content>
                      <v-list-item-title class="py-0 my-0"
                        ><p subtitle-2 class="py-0 my-0">
                          {{ topUsers[userIndex - 1].name }}
                        </p></v-list-item-title
                      >
                      <v-list-item-title class="py-0 my-0"
                        ><p subtitle-2 class="grey--text py-0 my-0">
                          @{{ topUsers[userIndex - 1].account }}
                        </p></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-col>
                  <v-spacer></v-spacer>
                  <!-- btn -->
                  <v-col cols="auto" class="pa-0 ma-0 d-flex justify-end">
                    <v-btn
                      v-if="!topUsers[userIndex - 1].isFollowed"
                      @click.stop.prevent="
                        addFollowing(topUsers[userIndex - 1].id)
                      "
                      rounded
                      outlined
                      small
                      color="primary"
                      class="justify-end"
                    >
                      跟隨
                    </v-btn>
                    <v-btn
                      v-else
                      @click.stop.prevent="
                        deleteFollowing(topUsers[userIndex - 1].id)
                      "
                      rounded
                      small
                      elevation="0"
                      color="primary"
                      class="justify-end"
                    >
                      正在跟隨
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list-item>
        </v-card-actions>
        <!-- load more... -->
        <v-list-item
          v-if="usersToShow < topUsers.length || topUsers.length > usersToShow"
        >
          <v-row class="py-2">
            <v-btn
              color="primary"
              plain
              small
              elevation="0"
              @click.stop.prevent="showMore()"
              >顯示更多</v-btn
            >
          </v-row>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "TopUsers",
  mixins: [emptyImageFilter],
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      topUsers: [],
      usersToShow: 5,
      totalUsers: 0,
    };
  },
  created() {
    this.fetchUsers();
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
    async fetchUsers() {
      try {
        const response = await usersAPI.getTopUsers();
        const users = response.data;
        this.topUsers = users;
        this.totalUsers = this.topUsers.length;
      } catch (error) {
        "error", error;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者，請稍後再試",
        });
      }
    },
    showMore() {
      this.usersToShow = this.totalUsers;
    },
    // TODO: UserProfileCard、Followings、Followers 狀態更新同步
    async addFollowing(userId) {
      try {
        // 不能跟隨自己
        if (userId === this.currentUser.id) {
          Toast.fire({
            icon: "error",
            title: "無法跟隨自己",
          });
          return;
        }
        const followingId = {
          id: userId,
        };
        const { data } = await usersAPI.addFollowing({ followingId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功加入跟隨",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入跟隨，請稍後再試",
        });
      }
    },
    async deleteFollowing(followingId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ followingId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
      } catch (error) {
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