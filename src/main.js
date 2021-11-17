import Vue from 'vue'
import Clipboard from 'v-clipboard'
import App from './App.vue'
import { i18n } from './plugins/i18n';
import router from './router'
import store from "./store";

import "./plugins/buefy"

Vue.config.productionTip = false
Vue.use(Clipboard)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
