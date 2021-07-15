<template>
  <v-container style="max-width: 1440px">
    <v-row>
      <v-col cols="12" md="3" class="sidenavcol pa-0">
        <SideNavBar :current-user="currentUser" />
      </v-col>
      <v-col cols="12" md="6" class="pa-0 maincol">
        <v-container class="ma-0 pa-0">
          <router-view></router-view>
        </v-container>
      </v-col>
      <v-col cols="12" md="3" class="topuserscol">
        <TopUsers :current-user="currentUser" />
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
.maincol {
  height: 100vh;
}
.topuserscol {
  border-left: thin solid rgba(0, 0, 0, 0.12);
}
</style>

<script>
import SideNavBar from "../components/SideNavBar.vue";
import TopUsers from "../components/TopUsers.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    SideNavBar,
    TopUsers,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script> 