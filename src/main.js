import Vue from 'vue'
import Clipboard from 'v-clipboard'
import App from './App.vue'
import VueMixpanel from 'vue-mixpanel'
import VueSimpleMarkdown from 'vue-simple-markdown'
import { i18n } from './plugins/i18n';
import router from './router'
import store from "./store";

import "./plugins/buefy"

Vue.use(Clipboard)
Vue.use(VueSimpleMarkdown)
Vue.use(VueMixpanel, {
  token: '49ea443465b7f0175aee7ff304f6afd6'
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false
