import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'

import AlertComponent from './components/shared/Alert'

Vue.component('app-alert', AlertComponent)

Vue.config.productionTip = false

require("./assets/main.scss")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
