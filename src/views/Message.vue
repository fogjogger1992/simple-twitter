<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
        class="ma-0 px-0 d-flex flex-column messagelistcol"
      >
        <v-card
          tile
          flat
          class="pa-3 align-center d-flex justify-space-between"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12); height: 52px"
          >訊息 <v-icon color="black">mdi-email-plus-outline</v-icon></v-card
        >
        <!-- direct message list -->
        <div class="dmlist">
          <DirectMessageCard />
        </div>
      </v-col>
      <!-- name & account -->
      <v-col cols="12" md="8" class="ma-0 px-0 d-flex flex-column messagecol">
        <v-card
          tile
          flat
          class="
            px-3
            py-1
            d-flex
            flex-column
            justify-space-around
            flex-shrink-0
          "
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12); height: 52px"
        >
          <!-- name -->
          <h3 style="line-height: 1">user1</h3>
          <!-- account -->
          <p
            class="caption grey--text font-weight-normal my-0 pa-0"
            style="line-height: 1.1"
          >
            @user1
          </p>
        </v-card>
        <!-- chatroom -->
        <div class="chatroom">
          <DirectMessage />
        </div>
        <v-spacer></v-spacer>
        <!-- input -->
        <v-card
          tile
          flat
          class="pa-3 align-center"
          style="border-top: thin solid rgba(0, 0, 0, 0.12)"
        >
          <v-row class="pa-0 ma-0">
            <v-col cols="11" class="pa-0 ma-0 align-self-center">
              <v-textarea
                v-model="message"
                class="pa-0 ma-0"
                hide-details
                rounded
                filled
                auto-grow
                rows="1"
                label="輸入訊息..."
              ></v-textarea>
            </v-col>
            <v-col
              cols="1"
              class="py-0 ma-0 px-2 align-self-center d-flex justify-center"
            >
              <v-icon
                @click.prevent.stop=""
                color="primary"
                style="font-size: 25px"
                >far fa-paper-plane</v-icon
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.messagelistcol {
  border-right: thin solid rgba(0, 0, 0, 0.12);
  height: 100vh;
}
.messagecol {
  border-right: thin solid rgba(0, 0, 0, 0.12);
  height: 100vh;
}
.dmlist,
.chatroom {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.dmlist::-webkit-scrollbar,
.chatroom::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import DirectMessage from "../components/DirectMessage.vue";
import DirectMessageCard from "./../components/DirectMessageCard.vue";
import { mapState } from "vuex";

export default {
  name: "Message",
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  components: {
    DirectMessage,
    DirectMessageCard,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {},
  methods: {},
};
</script>
