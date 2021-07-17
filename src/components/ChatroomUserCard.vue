<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <!-- avatar -->
      <v-col cols="auto" class="ma-0 pa-0">
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <v-avatar>
            <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img>
          </v-avatar>
        </router-link>
      </v-col>
      <!-- name and account -->
      <v-col no-gutters cols="auto" class="flex-grow-1 d-flex flex pa-2 ma-0">
        <v-col cols="auto" class="ma-0 pa-0 align-self-center">
          <p class="subtitle-2 font-weight-bold ma-0 pa-0">{{ user.name }}</p>
        </v-col>
        <v-col class="ma-0 pl-2 pr-0 py-0 align-self-center">
          <p
            class="subtitle-2 grey--text font-weight-normal ma-0 pa-0"
            style="text-decoration: none"
          >
            @{{ user.account }}
          </p>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "ChatroomUserCard",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {};
  },
  watch: {
    user: {
      handler: function (newValue) {
        this.user = {
          ...this.user,
          ...newValue,
        };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {},
};
</script>