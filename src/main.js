import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './my-theme/index.less';
import axios from 'axios'
import vcharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(vcharts)
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
