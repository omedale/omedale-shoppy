import Vue from 'vue'
import {
  Button, Layout, Input, Icon, Checkbox,
  Form, Menu, Radio, Select, Pagination
} from 'ant-design-vue'

import App from './App.vue'
import router from './router'
import './global.scss'

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Layout)
Vue.use(Radio)
Vue.use(Pagination)
Vue.use(Select)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
