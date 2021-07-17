<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="4" class="ma-0 px-0 d-flex flex-column userlistcol">
        <v-card tile flat class="pa-3 align-center" style="border-bottom: thin solid rgba(0, 0, 0, 0.12)">上線使用者 ({{ onlineUsers.length }})</v-card>
        <!-- online user list -->
        <div class="onlineuserlist">
          <ChatroomUserCard v-for="user in onlineUsers" :key="user.id" :user="user" :currentUser="currentUser" />
        </div>
      </v-col>
      <v-col cols="8" class="ma-0 px-0 d-flex flex-column chatroomcol">
        <v-card tile flat class="pa-3 align-center" style="border-bottom: thin solid rgba(0, 0, 0, 0.12)">公開聊天室</v-card>
        <!-- {{ Chatroom }} -->
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
.onlineuserlist {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.onlineuserlist::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import ChatroomUserCard from "../components/ChatroomUserCard.vue";
import { mapState } from "vuex";
// import { socket, publicNamespace, privateNamespace } from "@/socket";

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
    };
  },
  components: {
    ChatroomUserCard,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    customEmit: function () {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  created() {
    this.fetchOnlineUsers();
    // io.on('connect', onConnect);
    // this.$socket.emit('newUser');
    // socket.connect();

    // socket 設定
    // const msg = {};
    // msg.socketId = publicNamespace.id;
    // msg.content = "Hi for test.";
    // msg.isPublic = true;
    // publicNamespace.emit("sendMessage", msg);

    // socket.emit("newUser");
    // socket.on("connect", () => {
    //   console.log(socket);
    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });
    // socket.auth = { email };
    // socket.connect();
  },
  methods: {
    // TODO: modify after integrate api
    fetchOnlineUsers() {
      const { onlineUsers } = dummyData;
      this.onlineUsers = onlineUsers;
    },
  },
  destroyed() {
    // socket.off("connect");
  },
};
</script> 