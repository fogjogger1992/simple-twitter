import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
    debug: true,
    autoConnect: false,
    connection: SocketIO('https://simple-twitter-api-demo.herokuapp.com'),
    withCredentials: true,
    vuex: {
        store,
        // actionPrefix: 'SOCKET_',
        // mutationPrefix: 'SOCKET_'
    },
}))

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
