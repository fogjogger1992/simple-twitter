<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>

      <v-col cols="12" md="4" class="ma-0 px-0 d-flex flex-column userlistcol">
        <v-card tile flat class="pa-3 align-center" style="border-bottom: thin solid rgba(0, 0, 0, 0.12)">上線使用者 ({{ onlineUsers.length }})</v-card>
        <!-- online user list -->
        <div class="onlineuserlist">
          <ChatroomUserCard v-for="user in onlineUsers" :key="user.id" :user="user" :currentUser="currentUser" />
        </div>
      </v-col>
      <v-col cols="12" md="8" class="ma-0 px-0 d-flex flex-column chatroomcol">
        <v-card tile flat class="pa-3 align-center" style="border-bottom: thin solid rgba(0, 0, 0, 0.12)">公開聊天室</v-card>
        <!-- chatroom -->
        <div class="chatroom">
          <ChatroomMessage />
        </div>
        <v-spacer></v-spacer>
        <!-- input -->
        <v-card tile flat class="pa-3 align-center" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
          <v-row class="pa-0 ma-0">
            <v-col cols="11" class="pa-0 ma-0 align-self-center">
              <v-textarea v-model="message" class="pa-0 ma-0" hide-details rounded filled auto-grow rows="1" label="輸入訊息..."></v-textarea>
            </v-col>
            <v-col cols="1" class="py-0 ma-0 px-2 align-self-center d-flex justify-center">
              <v-icon @click.prevent.stop="sendMessage" color="primary" style="font-size: 25px">far fa-paper-plane</v-icon>
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

// TODO: remove after integrating api
const dummyData = {
  onlineUsers: [
    {
      id: 0,
      name: "user0",
      account: "user0",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 1,
      name: "user2",
      account: "user2",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "user3",
      account: "user3",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ],
};

export default {
  name: "Chatroom",
  data() {
    return {
      onlineUsers: [],
      message: "",
    };
  },
  components: {
    ChatroomUserCard,
    ChatroomMessage,
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
  methods: {
    // TODO: modify after integrate api
    fetchOnlineUsers() {
      const { onlineUsers } = dummyData;
      this.onlineUsers = onlineUsers;
    },
    sendMessage() {
      const payload = {
        senderId: this.currentUser.id,
        receiverId: null,
        content: this.message,
        isPublic: true,
      };
      this.$socket.emit("sendMessage", payload);
      this.message = "";
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  sockets: {
    newUser(data) {
      // 取得新加入使用者資料
      console.log("newUser: ", data);
    },
    onlineUser(data) {
      // 取得上線用戶資料
      console.log("onlineUser: ", data);
    },
    userJoin(data) {
      // 取得新用戶加入資訊
      console.log("userJoin: ", data);
    },
    historyMessages(data) {
      // 取得歷史聊天記錄
      console.log("historyMessages: ", data);
    },
    newMessage(data) {
      // 新送出的聊天訊息
      console.log("newMessage: ", data);
    },
    userLeave(data) {
      // 取得成員離開聊天室訊息
      console.log("userLeave: ", data);
    },
  },
  beforeDestroy() {
    // 離開聊天室
    this.$socket.disconnect()
    console.log("離開聊天室");
  },
};
</script> 