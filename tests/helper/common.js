import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  Form, Button, Icon, Input, Radio,
  Modal, Carousel, Spin, Pagination
} from 'ant-design-vue'

const localVue = createLocalVue()
localVue.use(Form)
localVue.use(Button)
localVue.use(Input)
localVue.use(Icon)
localVue.use(Modal)
localVue.use(Carousel)
localVue.use(Radio)
localVue.use(Spin)
localVue.use(Pagination)

localVue.use(Vuex)

export default localVue
