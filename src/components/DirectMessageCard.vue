<template>
  <v-card
    @click.prevent.stop=""
    flat
    tile
    class="pa-3 directmessagecard"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0 align-center" style="flex-wrap: nowrap">
      <!-- avatar -->
      <v-col cols="2" class="ma-0 pa-0" style="min-width: 50px">
        <!-- <router-link :to="{ name: 'user', params: { id: user.id } }"> -->
        <v-avatar>
          <v-img src="https://i.pravatar.cc/150?img=15"></v-img>
          <!-- <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img> -->
        </v-avatar>
        <!-- </router-link> -->
      </v-col>
      <!-- name, account, time, and message -->
      <v-col
        no-gutters
        cols="10"
        class="flex-shrink-1 d-flex flex-wrap py-2 pl-1 ma-0"
      >
        <v-col cols="12" class="d-flex align-center ma-0 pa-0">
          <!-- name -->
          <p class="subtitle-2 font-weight-bold ma-0 pa-0">name</p>
          <!-- account -->
          <p class="caption grey--text font-weight-normal ma-0 pa-0 pl-1">
            @account
          </p>
          <v-spacer></v-spacer>
          <!-- time -->
          <p class="caption grey--text text-right font-weight-normal ma-0 pa-0">
            11:30
          </p>
        </v-col>
        <v-col class="ma-0 pa-0">
          <!-- message -->
          <v-col cols="12" class="ma-0 pa-0">
            <p
              class="caption grey--text font-weight-normal ma-0 pa-0"
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              Commune scaevola imperdiet nec ut, sed euismod convenire principes
              at
            </p>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.directmessagecard:focus {
  border-right: 3px solid #ff6602;
}
</style>

<script>
export default {
  name: "DirectMessageCard",
};
</script>
