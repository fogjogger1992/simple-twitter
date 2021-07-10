<template>
  <div>
    <v-snackbar v-model="showPopup" :color="popupColor" timeout="3500" top right>
      <v-icon small color="white" class="mr-2">{{ popupColor === "green" ? 'fas fa-check-circle' : 'fas fa-times-circle' }}</v-icon>
      <span class="font-weight-bold">{{ popupMsg }}</span>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    showPopup: {
      get() {
        return this.$store.state.showPopup;
      },
      set(value) {
        this.$store.commit("setShowPopup", value);
      },
    },
    ...mapState({
      popupMsg: (state) => state.popupMsg,
      popupColor: (state) => state.popupColor,
    }),
  },
};
</script>