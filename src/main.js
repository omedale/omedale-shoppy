import Vue from 'vue'
import {
  Button, Layout, Input, Icon, Checkbox, Modal, Carousel,
  Form, Menu, Radio, Select, Pagination, Row, Col
} from 'ant-design-vue'

import App from './App.vue'
import router from './router'
import './global.scss'

Vue.use(Button)
Vue.use(Carousel)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Layout)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Pagination)
Vue.use(Select)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
