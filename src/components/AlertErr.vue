<template>
  <v-alert dense type="error" color="red darken-1">
    {{alertMsg}}
  </v-alert>
</template>
<script>
export default {
  props: {
    alertMsg: {
      type: String,
    },
  },
};
</script>