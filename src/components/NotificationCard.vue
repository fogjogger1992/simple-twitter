<template>
  <v-card
    flat
    tile
    class="pa-3"
    style="border-bottom: thin solid rgba(0, 0, 0, 0.12)"
  >
    <v-row no-gutters class="pa-0">
      <!-- avatar -->

      <router-link :to="{ name: 'user', params: { id: user.id } }">
        <v-avatar class="mt-1">
          <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img>
        </v-avatar>
      </router-link>

      <!-- name  -->

      <p class="subtitle-2 font-weight-bold ma-0 pa-0">{{ user.name }}</p>
    </v-row>
  </v-card>
</template>