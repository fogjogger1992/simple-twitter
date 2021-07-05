<template>
  <v-row justify="center">
    <v-col class="text-center">
      <p class="text-subtitle-1 font-weight-bold">使用者列表</p>

      <v-card class="mx-auto" max-width="210">
        <v-img class="align-end" height="110px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
        </v-img>
        <div class="avatar">
          <v-avatar size="80" class="avatar-border">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </div>

        <v-card-subtitle class="pb-0 black--text">
          User1
        </v-card-subtitle>
        <v-card-text class="text--primary">
          <div class="grey--text text--darken-2 mb-2">@user1</div>
          <div class="mb-2">
            <v-icon small>far fa-comment</v-icon> 10k <v-icon small class="pl-3">far fa-heart</v-icon> 20k
          </div>
          <div>34位跟隨中 <span class="pl-2">35位跟隨者</span></div>
        </v-card-text>

      </v-card>

    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AdminUsers",

  data() {
    return {};
  },
};
</script>
<style scoped>
.avatar {
  margin-top: -50px;
  margin-bottom: -10px;
}
.avatar-border {
  border: 2px solid white;
}
</style>