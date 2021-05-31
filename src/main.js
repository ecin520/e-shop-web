import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

import './assets/css/index.scss'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import moment from 'moment'
Vue.prototype.$moment = moment;
moment.locale('zh-cn');

import  qs from 'qs'
Vue.prototype.$qs = qs

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
