import { RouterLinkStub, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductList from '@/components/product/ProductList.vue'
import localVue from '../helper/common'
import productsData from '../data/products.js'

let wrapper
let store
let actions
let mutations
let state
let getters
let products = productsData

describe('ProductList.vue', () => {
  beforeEach(() => {
    const $router = {
      path: '/some/path',
      query: {},
      history: {
        current: {
          query: {
          }
        }
      }
    }
    actions = {
    }
    mutations = {
    }
    state = {
      products: products.rows,
      count: products.count,
      currentPage: 1
    }
    getters = {
      filterByCategoryIds: jest.fn(() => []),
      searchWord: jest.fn(() => ''),
      filterByPriceRange: jest.fn(() => [0, 0]),
      filterByDepartmentIds: jest.fn(() => []),
      products: state => state.products,
      sizes: jest.fn(() => []),
      colors: jest.fn(() => []),
      totalProducts: state => state.count,
      currentPage: state => state.currentPage
    }
    store = new Vuex.Store({
      actions,
      mutations,
      state,
      getters
    })
    wrapper = mount(ProductList, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      mocks: {
        $router
      },
      store,
      localVue
    })
  })

  afterEach(() => {
    products = {
      count: 0,
      rows: []
    }
    wrapper.destroy()
  })
  describe('When recieves products', async () => {
    it('renders 20 products', () => {
      expect(wrapper.findAll('.product').length).toBe(20)
    })
  })
  describe('when recieve no product', async () => {
    it('renders no product', () => {
      expect(wrapper.findAll('.product').length).toBe(0)
    })
  })
})

