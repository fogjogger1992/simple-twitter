<template>
  <!-- SELECTED with border-right -->
  <v-card
    @click.prevent.stop=""
    flat
    tile
    class="pa-3"
    style="
      border-bottom: thin solid rgba(0, 0, 0, 0.12);
      border-right: 3px solid #ff6602;
    "
  >
    <v-row no-gutters class="pa-0" style="flex-wrap: nowrap">
      <!-- avatar -->
      <v-col cols="auto" class="ma-0 pa-0">
        <!-- <router-link :to="{ name: 'user', params: { id: user.id } }"> -->
        <v-avatar>
          <v-img src="https://i.pravatar.cc/150?img=22"></v-img>
          <!-- <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img> -->
        </v-avatar>
        <!-- </router-link> -->
      </v-col>
      <!-- name, account, time, and message -->
      <v-col
        no-gutters
        cols="11"
        class="flex-shrink-1 d-flex flex-wrap py-2 ma-0"
      >
        <v-row cols="12" class="ma-0 pl-2 pr-0 align-self-center">
          <!-- name -->
          <v-col cols="auto" class="ma-0 pa-0 align-self-center">
            <p class="subtitle-2 font-weight-bold ma-0 pa-0">name</p>
          </v-col>
          <!-- account -->
          <v-col cols="auto" class="ma-0 px-1 py-0 align-self-center">
            <p class="caption grey--text font-weight-normal ma-0 pa-0">
              @account
            </p>
          </v-col>
          <v-spacer></v-spacer>
          <!-- time -->
          <v-col
            cols="5"
            class="
              ma-0
              pa-0
              flex-shrink-1
              align-self-center align-end
              text-right
            "
          >
            <p class="caption grey--text font-weight-normal ma-0 pa-0">11:30</p>
          </v-col>
          <!-- message -->
          <v-col cols="12" class="ma-0 pa-0 flex-grow-0">
            <p
              class="caption grey--text font-weight-normal ma-0 pa-0"
              style="
                width: 240.25px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              Commune scaevola imperdiet nec ut, sed euismod convenire principes
              at
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "DirectMessageCard",
};
</script>
