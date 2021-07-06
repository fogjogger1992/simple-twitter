import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const opts = {
  options: {
    customProperties: true,
  },
  theme: {
    // 在這裡設定主題配色
    dark: false, // 關閉深色主題
    // 使用淺色主題，設定他的配色
    themes: {
      light: { 
        primary: '#FF6602',
        secondary: '#ff9854',
        accent: '#0066CC',
        white: '#ffffff'
        // error: '#f44336',
        // warning: '#ff5722',
        // info: '#607d8b',
        // success: '#4caf50'
      },

    }
  }
}

export default new Vuetify(opts)
// export default new Vuetify({
// });
