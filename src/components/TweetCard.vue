<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <v-col class="flex-grow-1">
        <v-avatar class="mt-1">
          <img :src="tweet.User.image" :alt="tweet.User.name" />
        </v-avatar>
      </v-col>
      <v-col cols="11" class="flex-shrink-1">
        <v-row no-gutters align="center" class="pa-2">
          <p class="subtitle-2 font-weight-bold mr-1 my-0 pa-0">
            {{ tweet.User.name }}
          </p>
          <router-link
            :to="{ name: 'user', params: { id: tweet.User.account } }"
            class="subtitle-2 grey--text font-weight-normal pa-0"
            style="text-decoration: none"
          >
            @{{ tweet.User.account }}
          </router-link>
          <p class="subtitle-2 font-weight-normal grey--text pa-0 my-0 ml-1">
            ‧ {{ tweet.createdAt | fromNow }}
          </p>
        </v-row>
        <v-row no-gutters align="center" class="font-weight-normal px-2">
          <p class="body-2 font-weight-normal text-justify my-0">
            {{ tweet.text }}
          </p>
        </v-row>
        <v-row no-gutters align="center" class="font-weight-normal pa-2">
          <v-col cols="1" class="d-flex justify-space-between mr-5">
            <v-icon
              @click.stop.prevent="replyTweet"
              class="grey--text"
              style="font-size: 18px"
              >far fa-comment</v-icon
            >
            <p class="body-2 font-weight-normal grey--text pa-0 my-0 ml-1">
              {{ tweet.Replies.length }}
            </p>
          </v-col>
          <v-col cols="1" class="d-flex justify-space-between ml-5">
            <v-icon
              :disabled="tweet.User.account === user.account"
              @click.stop.prevent="addLiked(user)"
              class="grey--text"
              style="font-size: 18px"
              >far fa-heart</v-icon
            >
            <p class="body-2 grey--text pa-0 my-0 ml-1">
              {{ tweet.LikedUsers.length }}
            </p>
          </v-col>
        </v-row>
      </v-col>

      <NewTweetReplyModal
        :isTweetReplyDialogOpened.sync="isTweetReplyDialogOpened"
      />
    </v-row>
  </v-card>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import NewTweetReplyModal from "@/components/NewTweetReplyModal";

export default {
  name: "TweetCard",
  components: { NewTweetReplyModal },
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  data() {
    return {
      tweet: this.initialTweet,
      isTweetReplyDialogOpened: false,
    };
  },
  methods: {
    replyTweet() {
      console.log("replyTweet");
      this.isTweetReplyDialogOpened = true;
    },
    addLiked(user) {
      console.log("addLiked");
      if (!this.tweet.isLiked) {
        this.tweet.LikedUsers.push({ user });
        this.tweet.isLiked = true;
      }
    },
  },
};
</script>
