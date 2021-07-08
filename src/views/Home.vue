<template>
  <v-container style="max-width: 1440px">
    <v-row>
      <v-col cols="12" md="3" class="sidenavcol pa-0">
        <SideNavBar :user="user" />
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <!-- top nav -->
        <v-card
          tile
          flat
          class="pa-3"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
          >首頁</v-card
        >
        <v-container class="ma-0 pa-0">
          <router-view></router-view>
        </v-container>
      </v-col>
      <v-col cols="12" md="3" class="topuserscol">
        <TopUsers />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
* {
  font-weight: 900;
  font-size: 18px;
}
.sidenavcol {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
.topuserscol {
  border-left: thin solid rgba(0, 0, 0, 0.12);
}
</style>

<script>
import SideNavBar from "../components/SideNavBar.vue";
import TopUsers from "../components/TopUsers.vue";

// remove this after integrating API
const dummyData = {
  currentUser: {
    account: "foo",
    name: "foo",
    image: "https://i.pravatar.cc/300",
  },
};

export default {
  name: "Tweets",
  components: {
    SideNavBar,
    TopUsers,
  },
  data() {
    return {
      user: {
        account: "",
        name: "",
        image: "",
      },
      tweets: [],
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    // TODO: 向後端API拉取資料
    fetchUser() {
      const { account, name, image } = dummyData.currentUser;
      this.user.account = account;
      this.user.name = name;
      this.user.image = image;
    },
  },
};
</script> 