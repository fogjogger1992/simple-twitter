<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" class="sidenavcol">
        <SideNavBar :user="user" />
      </v-col>
      <v-col cols="12" sm="6" class="blue"></v-col>
      <v-col cols="12" sm="3" class="black"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
// remove this after integrating API
const dummyData = {
  currentUser: {
    account: "foo",
    name: "foo",
    image: "https://i.pravatar.cc/300",
  },
};

export default {
  name: "Home",
  components: {
    SideNavBar,
  },
  data() {
    return {
      user: {
        account: "",
        name: "",
        image: "",
      },
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