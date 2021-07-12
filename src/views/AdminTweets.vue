<template>
  <v-row>
    <v-col>
      <p class="text-subtitle-1 font-weight-bold">推文清單</p>

      <v-list three-line>
        <v-list-item-group color="secondary" v-model="selectedItem">
          <template v-for="tweet in tweets">

            <v-list-item :key="tweet.id">
              <v-list-item-avatar>
                <v-img :src="tweet.User.avatar | emptyImage"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{tweet.User.name}} <span class="text-body-2 grey--text text--darken-2">@{{tweet.User.account}} • {{tweet.createdAt | fromNow}}</span></v-list-item-title>
                <v-list-item-subtitle>{{tweet.description}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-btn icon @click="deleteTweet(tweet.id)">
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </v-list-item>

            <v-divider :key="tweet.name" inset></v-divider>

          </template>
        </v-list-item-group>
      </v-list>
      <Popup />
      <Loading />
    </v-col>
  </v-row>
</template>
<script>
import Popup from "@/components/Popup";
import Loading from "@/components/Loading";
import adminAPI from "../apis/admin";
// import moment from "moment";
import { mapMutations } from "vuex";
import { Toast } from "../utils/helpers";
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";

export default {
  name: "AdminTweets",
  components: { Popup, Loading },
  mixins: [fromNowFilter, emptyImageFilter],
  data() {
    return {
      tweets: [],
      selectedItem: null,
    };
  },
  async created() {
    this.setShowOverlayLoading(null, { root: true });
    try {
      // 取所有推文
      const { data } = await adminAPI.getTweets();
      this.setShowOverlayLoading(null, { root: true });
      // 失誤
      if (data.message) {
        throw new Error(data.message);
      }
      // 成功
      this.tweets = data;
    } catch (err) {
      console.log(err);
      this.setShowOverlayLoading(null, { root: true });
      this.setShowPopup(true, { root: true });
      this.setPopupDetails(
        { popupColor: "red", popupMsg: "無法取得推文內容，請稍後再試一次" },
        { root: true }
      );
    }
  },
  methods: {
    async deleteTweet(tweetId) {
      try {
        const decision = await Toast.fire({
          title: "確定要刪除此則推文嗎？",
          icon: "warning",
          position: "center",
          confirmButtonColor: "#FF6602",
          cancelButtonColor: "#888888",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
          showCancelButton: true,
          showConfirmButton: true,
          timer: undefined,
        });

        if (decision.isConfirmed) {
          const response = await adminAPI.deleteTweet(tweetId);
          console.log("response: ", response);

          const { data } = response;
          if (data.status === "success") {
            this.setShowPopup(true, { root: true });
            this.setPopupDetails(
              { popupColor: "green", popupMsg: "推文刪除成功" },
              { root: true }
            );
            const { data } = await adminAPI.getTweets();
            this.tweets = data;
          } else {
            throw new Error(data.message);
          }
        }
      } catch (err) {
        console.log(err);
        this.setShowPopup(true, { root: true });
        this.setPopupDetails(
          { popupColor: "red", popupMsg: "推文刪除失敗，請稍後再試一次" },
          { root: true }
        );
      }
    },
    ...mapMutations({
      setShowPopup: "setShowPopup",
      setPopupDetails: "setPopupDetails",
      setShowOverlayLoading: "setShowOverlayLoading",
    }),
  },
  computed: {},
};
</script>