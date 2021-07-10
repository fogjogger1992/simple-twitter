<template>
  <div class="text-center">
    <v-overlay :value="showOverlayLoading" z-index="203">
      <div class="text-h6 white--text text-center pb-8 pl-2">Loading...</div>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Loading",

  computed: {
    ...mapState({
      showOverlayLoading: (state) => state.showOverlayLoading,
    }),
  },
};
</script>