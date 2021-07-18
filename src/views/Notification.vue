<template>
  <v-container class="ma-0 pa-0 d-flex flex-column main">
    <!-- top nav -->
    <v-card
      tile
      flat
      class="pa-3 align-center"
      style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
      >通知</v-card
    >
    <!-- notification list -->
    <div class="notificationlist">
      <NotificationCard />
    </div>
  </v-container>
</template>

<style scoped>
.main {
  height: calc(100vh);
}
.notificationlist {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.notificationlist::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import NotificationCard from "./../components/NotificationCard.vue";
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
    NotificationCard,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {},
  methods: {},
};
</script>
