<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="4" class="ma-0 px-0 d-flex flex-column userlistcol">
        <v-card
          tile
          flat
          class="pa-3 align-center"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
          >上線使用者 ({{ onlineUsers.length }})</v-card
        >
        <!-- online user list -->
        <div class="onlineuserlist">
          <ChatroomUserCard
            v-for="user in onlineUsers"
            :key="user.id"
            :user="user"
            :currentUser="currentUser"
          />
        </div>
      </v-col>
      <v-col cols="12" md="8" class="ma-0 px-0 d-flex flex-column chatroomcol">
        <v-card
          tile
          flat
          class="pa-3 align-center"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
          >公開聊天室</v-card
        >
        <!-- chatroom -->
        <div class="chatroom" id="scroll-target">
          <div id="scrolled-content">
            <ChatroomMessage
              v-for="message in historyMessages"
              :key="message.id"
              :message="message"
              :currentUser="currentUser"
            />
          </div>
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
                @keydown.enter.prevent.stop="sendMessage"
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
                @click.prevent.stop="sendMessage"
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
.userlistcol {
  border-right: thin solid rgba(0, 0, 0, 0.12);
  height: 100vh;
}
.chatroomcol {
  border-right: thin solid rgba(0, 0, 0, 0.12);
  height: 100vh;
}
.onlineuserlist,
.chatroom {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.onlineuserlist::-webkit-scrollbar,
.chatroom::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import ChatroomUserCard from "../components/ChatroomUserCard.vue";
import ChatroomMessage from "../components/ChatroomMessage.vue";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  name: "Chatroom",
  data() {
    return {
      winHeight: window.innerHeight * 0.7 + "px",
      container: null,
      elem: null,
      scrollTop: 9999,
      onlineUsers: [],
      historyMessages: [],
      message: "",
    };
  },
  components: {
    ChatroomUserCard,
    ChatroomMessage,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  async created() {
    this.fetchOnlineUsers();
    // 同時與聊天室連線
    this.$socket.connect();
    // 一進入聊天室，顯示user上線，載入歷史訊息
    const payload = {
      id: this.currentUser.id,
      name: this.currentUser.name,
      account: this.currentUser.account,
      avatar: this.currentUser.avatar,
    };
    this.$socket.emit("newUser", payload);
  },
  mounted: function () {},
  methods: {
    scrollToBottom() {
      this.elem = document.getElementById("scrolled-content");
      this.container = document.getElementById("scroll-target");
      this.container.scrollTop = Math.floor(this.elem.offsetHeight);
    },
    fetchOnlineUsers(data) {
      this.onlineUsers = data;
    },
    sendMessage() {
      if (!this.message) {
        Toast.fire({
          icon: "warning",
          title: "請輸入訊息",
        });
        return;
      }
      if (!this.message.trim()) {
        Toast.fire({
          icon: "warning",
          title: "請輸入空格以外的訊息",
        });
        return;
      }
      console.log("傳入的訊息： ", this.message);

      const payload = {
        senderId: this.currentUser.id,
        receiverId: null,
        content: this.message,
        isPublic: true,
      };

      this.$socket.emit("sendMessage", payload);
      this.message = "";
    },
    fetchHistoryMessages(data) {
      this.historyMessages = data;
      // scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  sockets: {
    connect() {
      console.log("connect");
    },
    newUser(data) {
      console.log("newUser: ", data);
    },
    userJoin(data) {
      console.log("userJoin: ", data);
      this.historyMessages.push({
        ...data,
        isNotification: true,
      });
      // scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    onlineUser(data) {
      // 取得上線用戶資料
      console.log("onlineUser: ", data);
      this.fetchOnlineUsers(data);
    },
    historyMessages(data) {
      console.log("historyMessages: ", data);
      this.fetchHistoryMessages(data);
    },
    async newMessage(data) {
      console.log("newMessage: ", data);
      this.historyMessages.push({
        ...data[0],
      });
      // scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    userLeave(data) {
      // 取得成員離開聊天室訊息
      console.log("userLeave: ", data);
    },
  },
  beforeDestroy() {
    // 離開聊天室
    this.$socket.disconnect();
    console.log("離開聊天室");
  },
};
</script> 