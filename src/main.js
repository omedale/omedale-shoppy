import Vue from 'vue'
import {
  Button
} from 'ant-design-vue'

import App from './App.vue'
import router from './router'
import './global.scss'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
