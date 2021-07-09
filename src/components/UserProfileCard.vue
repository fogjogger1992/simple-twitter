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
        <v-img height="200px" :src="user.background"></v-img>
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
            <v-img :src="user.image"></v-img>
          </v-avatar>
        </v-col>
        <!-- btn -->
        <v-col cols="6" class="d-flex ma-0 px-0 py-4 align-self-end">
          <v-spacer></v-spacer>
          <v-btn
            @click.stop.prevent="openUserSelfEditModal"
            outlined
            rounded
            large
            color="primary"
            class="font-weight-bold"
          >
            編輯個人資料
          </v-btn>
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
        {{ user.description }}
      </p>
    </v-row>
    <!-- followings & followers -->
    <v-row no-gutters align="center" class="pa-3 ma-0">
      <p class="subtitle-2 font-weight-bold my-0 pa-0">
        {{ followings.length }} 個
      </p>
      <p class="subtitle-2 grey--text font-weight-bold mr-1 my-0 pa-0">
        跟隨中
      </p>
      <p class="subtitle-2 font-weight-bold my-0 pa-0">
        {{ followers.length }} 位
      </p>
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
import UserSelfEditModal from "@/components/UserSelfEditModal.vue";

export default {
  name: "UserProfileCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    tweets: {
      type: Array,
      required: true,
    },
    followings: {
      type: Array,
      required: true,
    },
    followers: {
      type: Array,
      required: true,
    },
  },
  components: {
    UserSelfEditModal,
  },
  data() {
    return {
      // 個人資料編輯視窗
      isProfileDialogOpened: false,
    };
  },
  methods: {
    openUserSelfEditModal() {
      this.isProfileDialogOpened = true;
    },
  },
};
</script>
