
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'

import router from './router/router'
import store from './store/base'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var config = {
      apiKey: 'AIzaSyAyVWAhtlHOMlQQ7k7YZ713NtILu-w-m9U',
      authDomain: 'vue-spa-project.firebaseapp.com',
      databaseURL: 'https://vue-spa-project.firebaseio.com',
      projectId: 'vue-spa-project',
      storageBucket: 'vue-spa-project.appspot.com',
      messagingSenderId: '314937424136'
    }
      firebase.initializeApp(config)
  }
})
