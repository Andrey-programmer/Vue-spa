
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import router from './router/router'
import store from './store/base'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
