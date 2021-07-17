<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="4" class="ma-0 px-0 d-flex flex-column userlistcol">
        <v-card
          tile
          flat
          class="pa-3 align-center"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
          >訊息</v-card
        >
        <!-- {{ MessageCard }} -->
      </v-col>
      <v-col cols="8" class="ma-0 px-0 d-flex flex-column chatroomcol">
        <v-card
          tile
          flat
          class="pa-3 align-center"
          style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
          >name</v-card
        >
        <!-- {{ Message }} -->
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
</style>