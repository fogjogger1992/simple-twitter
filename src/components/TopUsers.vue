<template>
  <v-row class="justify-center ma-0 pa-0">
    <v-col cols="10" class="mt-5 pa-0">
      <v-card flat class="mx-auto grey lighten-3 rounded-lg">
        <v-card-title class="py-2">
          <span class="font-weight-bold" style="font-size: 18px">跟隨誰</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions
          v-for="userIndex in usersToShow"
          :key="topUsers[userIndex - 1].account"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
        >
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                :src="topUsers[userIndex - 1].image"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content class="flex-shrink-1">
              <v-list-item-title class="py-0 my-0"
                ><p subtitle-2 font-weight-bold class="py-0 my-0">
                  {{ topUsers[userIndex - 1].name }}
                </p></v-list-item-title
              >
              <v-list-item-title class="py-0 my-0"
                ><p subtitle-2 font-weight-bold class="grey--text py-0 my-0">
                  @{{ topUsers[userIndex - 1].account }}
                </p></v-list-item-title
              >
            </v-list-item-content>

            <v-row align="center" justify="end">
              <v-btn
                v-if="!topUsers[userIndex - 1].isFollowed"
                @click.stop.prevent="
                  addFollowed(topUsers[userIndex - 1].account)
                "
                rounded
                outlined
                small
                color="primary"
                class="mr-3"
              >
                跟隨
              </v-btn>
              <v-btn
                v-else
                @click.stop.prevent="
                  removeFollowed(topUsers[userIndex - 1].account)
                "
                rounded
                small
                elevation="0"
                color="primary"
                class="mr-3"
              >
                正在跟隨
              </v-btn>
            </v-row>
          </v-list-item>
        </v-card-actions>
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
const dummyData = {
  users: [
    {
      account: "tset1",
      name: "Tset 1",
      image: "https://i.pravatar.cc/300",
      isFollowed: true,
    },
    {
      account: "tset2",
      name: "Tset 2",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset3",
      name: "Tset 3",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset4",
      name: "Tset 4",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset5",
      name: "Tset 5",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset6",
      name: "Tset 6",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset7",
      name: "Tset 7",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset8",
      name: "Tset 8",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset9",
      name: "Tset 9",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
    {
      account: "tset10",
      name: "Tset 10",
      image: "https://i.pravatar.cc/300",
      isFollowed: false,
    },
  ],
};
export default {
  name: "TopUsers",
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
  mounted() {
    this.totalUsers = this.topUsers.length;
  },
  methods: {
    fetchUsers() {
      const { users } = dummyData;
      this.topUsers = users;
    },
    showMore() {
      this.usersToShow = 10;
      console.log(this.usersToShow);
    },
    addFollowed(userId) {
      this.topUsers = this.topUsers.map((user) => {
        if (user.account !== userId) {
          return user;
        }
        return {
          ...user,
          isFollowed: true,
        };
      });
    },
    removeFollowed(userId) {
      this.topUsers = this.topUsers.map((user) => {
        if (user.account !== userId) {
          return user;
        }
        return {
          ...user,
          isFollowed: false,
        };
      });
    },
  },
};
</script>