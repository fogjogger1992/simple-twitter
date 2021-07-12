<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <router-link
      :to="{ name: 'tweet', params: { id: tweet.id } }"
      style="text-decoration: none"
    >
      <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
        <v-col class="flex-grow-1">
          <router-link :to="{ name: 'user', params: { id: tweet.User.id } }">
            <v-avatar class="mt-1">
              <img :src="tweet.User.avatar" :alt="tweet.User.name" />
            </v-avatar>
          </router-link>
        </v-col>
        <v-col cols="11" class="flex-shrink-1">
          <v-row no-gutters align="center" class="pa-2">
            <p class="subtitle-2 font-weight-bold mr-1 my-0 pa-0">
              {{ tweet.User.name }}
            </p>
            <p class="subtitle-2 grey--text font-weight-regular my-0 pa-0">
              @{{ tweet.User.account }}
            </p>
            <p class="subtitle-2 font-weight-regular grey--text pa-0 my-0 ml-1">
              ‧ {{ tweet.createdAt | fromNow }}
            </p>
          </v-row>
          <v-row no-gutters align="center" class="font-weight-normal px-2">
            <p class="body-2 black--text font-weight-normal text-justify my-0">
              {{ tweet.description }}
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
              <p
                class="subtitle-2 font-weight-normal grey--text pa-0 my-0 ml-1"
              >
                {{ tweet.replyCounts }}
              </p>
            </v-col>
            <v-col cols="1" class="d-flex justify-space-between ml-5">
              <!-- isLiked / !isLiked -->
              <v-icon
                class="grey--text"
                @click.stop.prevent="addLike(tweet.id)"
                style="font-size: 18px"
                >far fa-heart</v-icon
              >
              <p class="subtitle-2 grey--text pa-0 my-0 ml-1">
                {{ tweet.likeCounts }}
              </p>
            </v-col>
          </v-row>
        </v-col>

        <!-- <NewTweetReplyModal
          :tweetReplyDialogOpen.sync="tweetReplyDialogOpen"
        /> -->
      </v-row>
    </router-link>
  </v-card>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
// import NewTweetReplyModal from "@/components/NewTweetReplyModal";
import { mapMutations} from 'vuex';

export default {
  name: "TweetCard",
  // components: { NewTweetReplyModal },
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
      // tweetReplyDialogOpen: false,
    };
  },
  methods: {
    replyTweet() {
      console.log("replyTweet");
      // 把要回覆的該則推文傳給 store
      this.setTweet(this.tweet)
      // this.tweetReplyDialogOpen = true;
      this.setTweetReplyDialogOpen(true)
    },
    ...mapMutations({
      setTweet: 'tweets/setTweet',
      setTweetReplyDialogOpen: 'tweets/setTweetReplyDialogOpen'
    })
    // TODO: addLike
    // TODO: deleteLike
  },
};
</script>
