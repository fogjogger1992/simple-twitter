<template>
  <v-app id="app">

    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/img/logo.svg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>管理員 {{ currentUser.name }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item color="secondary" v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon small>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="item.action()">
            <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main class="pl-0">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "推文清單", icon: "fab fa-twitter", link: "./admin_main" },
        {
          title: "使用者列表",
          icon: "fas fa-user-friends",
          link: "./admin_users",
        },
        {
          title: "登出",
          icon: "fas fa-sign-out-alt",
          action: () => this.logout(),
        },
      ],
      mini: true,
    };
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/admin");
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUser,
    }),
  },
};
</script>