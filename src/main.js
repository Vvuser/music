// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//fastclick
import fastclick from 'fastclick'
fastclick.attach(document.body)

//axios
import Axios from 'axios'
Vue.prototype.http = Axios

//vue-lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	loading: 'static/img/logo.png' 
})
//vuex 
import store from './store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
