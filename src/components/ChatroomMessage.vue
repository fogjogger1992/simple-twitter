<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters class="d-flex flex-column ma-0 pa-0">
      <!-- online, offline notification -->
      <v-col
        v-if="message.isNotification"
        cols="12"
        class="ma-0 pa-0 justify-center"
      >
        <v-row class="ma-0 pa-0 justify-center">
          <v-col cols="auto" class="py-2">
            <v-card flat color="grey lighten-1" class="ma-0 pa-0 rounded-pill">
              <v-card-text class="grey--text text--darken-2 py-0">
                <strong class="ma-0" style="font-size: 12px"
                  >{{ message.name }} 上線</strong
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- message from others -->
      <v-col
        v-else-if="
          !message.isNotification && message.Sender.id !== this.currentUser.id
        "
        cols="12"
        class="ma-0 px-3 pt-3"
      >
        <v-row class="ma-0 pa-0 align-end" style="flex-wrap: nowrap">
          <v-col cols="auto" class="px-0 ma-0 pb-1">
            <!-- avatar -->
            <router-link
              :to="{ name: 'user', params: { id: message.Sender.id } }"
            >
              <v-avatar>
                <v-img
                  :src="message.Sender.avatar | emptyImage"
                  :alt="message.Sender.name"
                ></v-img>
              </v-avatar>
            </router-link>
          </v-col>
          <v-col cols="auto" class="flex-shrink-1 pb-1">
            <v-card
              flat
              color="grey lighten-1"
              class="rounded-br-xl rounded-bl-0 rounded-tr-xl rounded-tl-xl"
            >
              <v-card-text class="black--text">
                <p class="ma-0">
                  {{ message.content }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4" class="flex-shrink-0"></v-col>
        </v-row>
        <v-row class="ma-0 py-0" style="padding-left: 48px">
          <p class="caption grey--text ma-0 px-3">
            {{ message.createdAt | fromNow }}
          </p>
        </v-row>
      </v-col>
      <!-- self message -->
      <v-col v-else cols="12" class="ma-0 px-3">
        <v-row
          class="ma-0 pa-0 justify-space-between"
          style="flex-wrap: nowrap"
        >
          <v-col cols="5" class="flex-shrink-0 pb-1"> </v-col>
          <v-col cols="auto" class="flex-shrink-1 pb-1">
            <v-card
              flat
              color="primary"
              class="rounded-br-0 rounded-bl-xl rounded-tr-xl rounded-tl-xl"
            >
              <v-card-text class="white--text">
                <p class="ma-0">
                  {{ message.content }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="ma-0 py-0 justify-end">
          <p class="caption text-right grey--text ma-0 px-3">
            {{ message.createdAt | fromNow }}
          </p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins";

export default {
  name: "ChatroomMessage",
  props: {
    message: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  mixins: [fromNowFilter, emptyImageFilter],
};
</script>
