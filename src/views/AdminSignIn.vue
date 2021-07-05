<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="5" class="text-center">
        <p class="text--h6 font-weight-bold mt-4">後台登入</p>

        <LoginForm />

        <div class="text-right">
        <router-link class="text-subtitle-2 secondary--text font-weight-bold" to="/signin">前台登入</router-link>
        </div>
        
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: "AdminSignIn",
  components: { LoginForm },
  data: () => ({

  }),
  methods: {
  },
  computed: {

  },
};
</script>