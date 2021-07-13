<template>
  <v-container class="ma-0 pa-0">
    <!-- top nav -->
    <v-card
      tile
      flat
      class="pa-3 align-center"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
    >
      <v-row no-gutters class="ma-0 pa-0 align-center">
        <v-col cols="1" class="ma-0 pa-0">
          <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
        </v-col>
        <v-col cols="auto" class="ma-0 pa-0"> 推文 </v-col>
      </v-row>
    </v-card>
    <!-- tweet detail -->
    <v-card flat tile class="pa-3">
      <v-row no-gutters class="pa-0 flex-column">
        <v-row no-gutters class="py-2">
          <!-- avatar -->
          <v-col cols="auto">
            <router-link :to="{ name: 'user', params: { id: tweet.User.id } }">
              <v-avatar class="mt-1">
                <img :src="tweet.User.avatar" :alt="tweet.User.name" />
              </v-avatar>
            </router-link>
          </v-col>
          <!-- name and account -->
          <v-col no-gutters class="pa-2">
            <p class="subtitle-2 black--text font-weight-bold my-0 pa-0">
              {{ tweet.User.name }}
            </p>
            <p class="subtitle-2 grey--text font-weight-normal my-0 pa-0">
              @{{ tweet.User.account }}
            </p>
          </v-col>
        </v-row>
        <!-- text -->
        <v-row no-gutters class="py-2">
          <h2 class="my-0 font-weight-regular">
            {{ tweet.description }}
          </h2>
        </v-row>
        <!-- created at -->
        <v-row no-gutters class="pt-0 py-2">
          <p class="subtitle-2 font-weight-normal grey--text pa-0 my-0 ml-1">
            {{ tweet.createdAt | fromNow }}
          </p>
        </v-row>
      </v-row>
    </v-card>
    <!-- replies and likes counts -->
    <v-card
      tile
      flat
      class="mx-3 py-3 align-center grey--text"
      style="
        font-size: 16px;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        border-top: thin solid rgba(0, 0, 0, 0.12);
      "
    >
      <v-row class="pa-0 ma-0">
        <v-col cols="2" class="pa-0 ma-0"
          ><span class="black--text">{{ tweet.replyCounts }}</span> 回覆</v-col
        >
        <v-col cols="10" class="pa-0 ma-0"
          ><span class="black--text">{{ tweet.likeCounts }}</span>
          喜歡次數</v-col
        >
      </v-row>
    </v-card>
    <!-- replies and likes icons -->
    <v-card
      tile
      flat
      class="pa-3 align-center grey--text"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
    >
      <v-row class="pa-0 ma-0">
        <v-col cols="2" class="pa-0 ma-0"
          ><v-icon @click.stop.prevent="replyTweet" style="font-size: 20px"
            >far fa-comment</v-icon
          ></v-col
        >
        <v-col cols="10" class="pa-0 ma-0"
          ><v-icon @click.stop.prevent="addLiked" style="font-size: 20px"
            >far fa-heart</v-icon
          ></v-col
        >
      </v-row>
    </v-card>
    <!-- replies -->
    <v-card
      v-for="reply in replies"
      :key="reply.id"
      flat
      tile
      class="pa-3"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
    >
      <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
        <v-col class="flex-grow-1">
          <v-avatar class="mt-1">
            <img :src="reply.User.avatar" :alt="reply.User.name" />
          </v-avatar>
        </v-col>
        <v-col cols="11" class="flex-shrink-1">
          <v-row no-gutters align="center" class="pa-2">
            <p class="subtitle-2 font-weight-bold mr-1 my-0 pa-0">
              {{ reply.User.name }}
            </p>
            <router-link
              :to="{ name: 'user', params: { id: reply.User.id } }"
              class="subtitle-2 grey--text font-weight-normal pa-0"
              style="text-decoration: none"
            >
              @{{ reply.User.account }}
            </router-link>
            <p class="subtitle-2 font-weight-normal grey--text pa-0 my-0 ml-1">
              ‧ {{ reply.createdAt | fromNow }}
            </p></v-row
          >
          <v-row no-gutters align="center" class="font-weight-normal px-2 mb-2">
            <p class="body-2 font-weight-normal text-justify grey--text my-0">
              回覆
              <router-link :to="{ name: 'user', params: { id: tweet.User.id } }"
                >@{{ tweet.User.name }}</router-link
              >
            </p>
          </v-row>
          <v-row no-gutters align="center" class="font-weight-normal px-2">
            <p class="body-2 font-weight-normal text-justify my-0">
              {{ reply.comment }}
            </p>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Tweet",
  mixins: [fromNowFilter],
  data() {
    return {
      tweet: {
        id: -1,
        description: "",
        replyCounts: 3,
        likeCounts: 0,
        createdAt: "",
        User: {
          id: -1,
          name: "",
          account: "",
          avatar: "",
        },
      },
      replies: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchTweet(id);
    this.fetchReplies(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchTweet(id);
    this.fetchReplies(id);
    next();
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id, description, replyCounts, likeCounts, createdAt, User } =
          data;

        this.tweet = {
          ...this.tweet,
          id,
          description,
          replyCounts,
          likeCounts,
          createdAt,
          User,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
      }
    },
    async fetchReplies(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweetReplies({ tweetId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.replies = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
      }
    },

    // TODO: reply & like
    replyTweet() {
      console.log("replyTweet");
    },
    addLiked() {
      console.log("addLiked");
    },
  },
};
</script>