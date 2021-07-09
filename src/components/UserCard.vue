<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <!-- avatar -->
      <v-col class="flex-grow-1">
        <v-avatar class="mt-1">
          <img :src="user.image" :alt="user.name" />
        </v-avatar>
      </v-col>
      <!-- name and account -->
      <v-col cols="11" class="flex-shrink-1">
        <v-row no-gutters align="center" class="pa-0">
          <v-col no-gutters cols="9" class="d-flex flex-column pa-2 ma-0">
            <p class="subtitle-2 font-weight-bold ma-0 pa-0">{{ user.name }}</p>
            <p
              class="subtitle-2 grey--text font-weight-normal ma-0 pa-0"
              style="text-decoration: none"
            >
              @{{ user.account }}
            </p>
          </v-col>
          <v-spacer></v-spacer>
          <!-- btn -->
          <v-col no-gutters cols="auto" class="d-flex ma-0 pa-2">
            <v-btn
              v-if="!user.isFollowed"
              rounded
              outlined
              small
              color="primary"
            >
              跟隨
            </v-btn>
            <v-btn v-else rounded small elevation="0" color="primary">
              正在跟隨
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          align="center"
          class="d-flex flex-wrap font-weight-normal px-2"
        >
          <v-col class="body-2 font-weight-normal text-justify my-0">
            {{ user.info }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
};
</script>
