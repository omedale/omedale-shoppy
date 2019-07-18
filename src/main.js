import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'
import {
  Button, Layout, Input, Icon, Checkbox, Modal, Carousel, Avatar,
  Form, Menu, Radio, Select, Pagination, Row, Col, Table, Tag, Badge, Alert, Spin
} from 'ant-design-vue'

import store from './store'
import App from './App.vue'
import router from './router'
import './global.scss'

Vue.use(VueStripeCheckout, 'pk_test_J3pjN4atklongAk7bZf8ceqJ00kTG38jww')
Vue.use(Alert)
Vue.use(Avatar)
Vue.use(Badge)
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
Vue.use(Spin)
Vue.use(Table)
Vue.use(Tag)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
