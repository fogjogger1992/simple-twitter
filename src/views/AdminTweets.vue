<template>
  <v-row justify="center">
    <v-col class="text-center">
      <p class="text-subtitle-1 font-weight-bold">推文清單</p>

      <v-card class="mx-auto">
        <v-card-title class="py-2">
           <v-list-item-avatar color="grey darken-3">
              <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
            </v-list-item-avatar>
            <span class="text-body-2">User1</span> 
            <span class="ml-2 text-body-2 grey--text text--darken-2"> @user1 • 3hr </span>
            <v-spacer></v-spacer>
              <v-icon class="" right>
                mdi-close
              </v-icon>
        </v-card-title>
        <v-card-text class="d-flex">
          "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
        </v-card-text>

     
      </v-card>

    </v-col>
    </v-row>
</template>
<script>
export default {
  name: "AdminTweets",

  data() {
    return {};
  },
};
</script>