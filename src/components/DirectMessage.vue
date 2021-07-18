<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters class="d-flex flex-column ma-0 pa-0">
      <!-- message from others -->
      <v-col cols="12" class="ma-0 px-3 pt-3">
        <v-row class="ma-0 pa-0 align-end" style="flex-wrap: nowrap">
          <v-col cols="auto" class="px-0 ma-0 pb-1">
            <!-- avatar -->
            <!-- <router-link :to="{ name: 'user', params: { id: user.id } }"> -->
            <v-avatar>
              <!-- <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img> -->
              <v-img src="https://i.pravatar.cc/150?img=15"></v-img>
            </v-avatar>
            <!-- </router-link> -->
          </v-col>
          <v-col cols="auto" class="flex-shrink-1 pb-1">
            <v-card
              flat
              color="grey lighten-1"
              class="rounded-br-xl rounded-bl-0 rounded-tr-xl rounded-tl-xl"
            >
              <v-card-text class="black--text">
                <p class="ma-0">
                  Commune scaevola imperdiet nec ut, sed euismod convenire
                  principes at.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4" class="flex-shrink-0"></v-col>
        </v-row>
        <v-row class="ma-0 py-0" style="padding-left: 48px">
          <p class="caption grey--text ma-0 px-3">11:30</p>
        </v-row>
      </v-col>
      <!-- self message -->
      <v-col cols="12" class="ma-0 px-3">
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
                <p class="ma-0">Lorem ipsum.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="ma-0 py-0 justify-end">
          <p class="caption text-right grey--text ma-0 px-3">11:30</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>