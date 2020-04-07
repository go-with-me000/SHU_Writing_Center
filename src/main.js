import layui from 'layui-layer'
import axios from 'axios'
import GeminiScrollbar from 'vue-gemini-scrollbar'
// import Vue from 'vue'
import App from './App'
import router from './router'
import "./interceptors/interceptor.js"
import 'url-search-params-polyfill'
import "babel-polyfill"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
axios.defaults.withCredentials=true
Vue.use(GeminiScrollbar)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
const FastClick = require('fastclick')
FastClick.attach(document.body)

var vue = new Vue({
  el: '#app',
   router,
  components: {
    App
  },
  router,
    template: '<App/>'
})
export default vue

