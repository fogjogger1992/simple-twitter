<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters>
      <!-- avatar -->
      <!-- <router-link :to="{ name: 'user', params: { id: user.id } }"> -->
      <v-avatar class="mt-1">
        <!-- <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img> -->
        <v-img src="https://i.pravatar.cc/150?img=26"></v-img>
      </v-avatar>
      <!-- </router-link> -->
    </v-row>
    <v-row no-gutters class="pt-2">
      <!-- name  -->
      <p class="subtitle-2 font-weight-bold ma-0 pa-0">
        User {{ type.newTweet }}
      </p>
    </v-row>
    <v-row v-if="message" no-gutters class="pt-1">
      <!-- message  -->
      <p class="body-2 grey--text font-weight-regular ma-0 pa-0">
        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
        imperdiet nec ut, sed euismod convenire principes at. Est et nobis
        iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
        sententiae.
      </p>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      type: {
        newTweet: "有新的推文通知",
        newReply: "有新的回覆",
        newFollower: "開始追蹤你",
        newTweetLike: "喜歡你的貼文",
        newReplySelfTweet: "你的貼文有新的回覆",
      },
      message: true,
    };
  },
};
</script>
