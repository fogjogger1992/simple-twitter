<template>
  <v-row>
    <v-col>
      <p class="text-subtitle-1 font-weight-bold">使用者列表</p>
      <span class="text-body-2"> 目前總共 {{users.length}} 位使用者 </span>

      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2" class="d-flex ma-0 py-3 justify-center mt-4" v-for="user in users" :key="user.id">
          <v-hover v-slot="{ hover }">
            <v-card class="mx-auto text-center" :elevation="hover ? 4 : 1" :class="{ 'on-hover': hover }">
              <v-img class="align-end" height="110px" :src="user.cover | emptyImage">
              </v-img>
              <div class="avatar">
                <v-avatar size="80" class="avatar-border">
                  <v-img :src="user.avatar | emptyImage" :alt="user.name"></v-img>
                </v-avatar>
              </div>

              <v-card-subtitle class="pb-0 black--text">
                {{user.name}}
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div class="grey--text text--darken-2 mb-2">@{{user.account}}</div>
                <div class="mb-2 d-flex justify-center">

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs" v-on="on">
                        <v-icon small>far fa-comment</v-icon> {{user.TweetCounts}}
                      </div>
                    </template>
                    <span>{{user.name}}的推文數</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs" v-on="on">
                        <v-icon small class="pl-3">far fa-heart</v-icon> {{user.BeLikedCounts || 0}}
                      </div>
                    </template>
                    <span>{{user.name}}的推文被喜愛的次數</span>
                  </v-tooltip>

                </div>
                <div>{{user.followingCounts}}位跟隨中 <span class="grey--text text--lighten-1">  |  </span>{{user.followerCounts}}位跟隨者</div>

              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <Loading />
    </v-col>
  </v-row>
</template>
<script>
import Loading from "@/components/Loading";
import adminAPI from "../apis/admin";
import { mapMutations } from "vuex";
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "AdminUsers",
  components: { Loading },
  mixins: [emptyImageFilter],
  data() {
    return {
      users: [],
    };
  },
  async created() {
    this.setShowOverlayLoading(null, { root: true });
    try {
      // 取使用者名單
      const { data } = await adminAPI.getUsers();
      this.setShowOverlayLoading(null, { root: true });
      // 失誤
      if (data.message) {
        throw new Error(data.message);
      }
      // 成功
      this.users = data;
    } catch (err) {
      this.setShowOverlayLoading(null, { root: true });
      console.log(err);
    }
  },
  methods: {
    ...mapMutations({
      setShowOverlayLoading: "setShowOverlayLoading",
    }),
  },
};
</script>
<style scoped>
.avatar {
  margin-top: -50px;
  margin-bottom: -10px;
}
.avatar-border {
  border: 2px solid white;
}
</style>