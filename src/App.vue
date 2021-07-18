<template>
  <v-app id="simple-twitter">
    <v-main>
      <router-view v-if="isAlive" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isAlive: true,
    };
  },
  methods: {
    reload() {
      this.isAlive = false;
      this.$nextTick(() => {
        this.isAlive = true;
      });
    },
  },
};
</script>
<style>
@import "https://use.fontawesome.com/releases/v5.15.1/css/all.css";
@import "./assets/styles/style.css";
</style>
