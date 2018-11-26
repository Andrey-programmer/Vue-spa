import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as firebase from 'firebase'

import router from './router/router'
import store from './store/store'
import BuyModalComponent from './components/shared/BuyModal.vue'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken3
  }
})
Vue.component('app-buy-modal', BuyModalComponent)

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App
    },
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
      /* firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('autoLoginUser', user)
        }
      }) */
      this.$store.dispatch('autoLoginUser', localStorage.getItem('spa-user'))
      // localStorage.getItem('spa-user')
      // console.log('==========', localStorage.getItem('spa-user'))

      this.$store.dispatch('getDatabaseAds')
  }
})
