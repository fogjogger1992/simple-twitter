<template>
  <v-row>
    <v-col class="">
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

      <v-list three-line>
        <template v-for="(item, index) in items">
          <!-- <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader> -->
          <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.title}} <span class="text-body-2 grey--text text--darken-2">{{item.account}} • 3hr</span></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
       
          <v-icon right>
            mdi-close
          </v-icon>
          </v-list-item>
        </template>
      </v-list>

    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AdminTweets",

  data() {
    return {

      items: [
        // { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'User1',
          account: 'User1',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          account: 'User1',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          account: 'User1',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          account: 'User1',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          account: 'User1',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
};
</script>