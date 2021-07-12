<template>
  <v-container class="sidenav d-flex flex-column py-0 my-0">
    <v-row cols="1" class="flex-grow-1 flex-shrink-0 py-0 my-0 px-8">
      <!-- ac logo svg -->
      <v-col cols="12">
        <div class="mt-5">
          <router-link to="/tweets">
            <img src="../assets/img/logo.svg" />
          </router-link>
        </div>
        <!-- nav list -->
        <v-list flat class="mt-2 mr-0">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              class="pl-0 pr-0"
              v-for="(item, i) in items"
              :key="i"
              :to="item.link"
              link
            >
              <v-list-item-icon class="mr-4">
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <!-- btn add new tweet -->
        <v-btn
          block
          rounded
          color="primary"
          dark
          class="mt-2"
          @click="
            () => {
              isTweetDialogOpened = true;
            }
          "
        >
          推文
        </v-btn>
      </v-col>
    </v-row>
    <NewTweetModal :isTweetDialogOpened.sync="isTweetDialogOpened" />
    <Popup />
    <NewTweetReplyModal v-if="tweetReplyDialogOpen" />
    <v-row cols="1" class="flex-grow-0 flex-shrink-0 py-0 my-0 px-8">
      <v-col cols="12" class="py-5 my-0">
        <v-btn block rounded color="white" class="btnsignout">
          <v-icon>mdi-logout-variant</v-icon> 登出
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
* {
  font-weight: 900;
  font-size: 18px;
}
@media screen and (min-width: 960px) {
  .sidenav {
    height: calc(100vh);
  }
}
</style>

<script>
import NewTweetModal from "./NewTweetModal.vue";
import NewTweetReplyModal from '@/components/NewTweetReplyModal.vue'
import Popup from "@/components/Popup";
import { mapState } from 'vuex'

export default {
  name: "SideNavBar",
  components: { NewTweetModal, Popup, NewTweetReplyModal },
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isTweetDialogOpened: false,

      selectedItem: 0,
      items: [
        { text: "首頁", icon: "mdi-home-variant-outline", link: "/tweets" },
        {
          text: "個人資料",
          icon: "mdi-account-outline",
          link: "/users/" + this.currentUser.id,
        },
        { text: "設定", icon: "mdi-cog-outline", link: "/setting" },
      ],
    };
  },
  methods: {
  },
    computed: {
    ...mapState({
      tweetReplyDialogOpen: (state) => state.tweets.tweetReplyDialogOpen
    }),
  },

};
</script>