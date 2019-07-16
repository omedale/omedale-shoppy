<template>
<div>
  <header class="section-header">
    <section class="section-wrapper">
      <div class="container">
        <div class="row align-items-center">
          <div class="flex-pull-left col-md-6 col-lg-6 col-sm-12">
            <router-link :to="'/'" class="home link py-1">
              <h3 class="primary-color">My Shop</h3>
            </router-link>
            <a-input-search
                  placeholder="search"
                  class="search-bar py-1"
                  :size="'small'"
                  @change="onSearchChange"
                  @search="onSearch"
                />
          </div>
          <div class="flex-pull-right col-md-6 col-lg-6 col-sm-12">
            <div class="customer-wrap py-1">
              <span>Hi</span>
              <span v-if="customerName">
                <span class="name">{{customerName}}</span> |
                <span @click="logout" class="logout primary-color">Logout</span>
              </span>
              <span v-else>
                |
                <span><router-link :to="'/customer/login'" class="link">Login</router-link></span> or
                <span><router-link :to="'/customer/register'" class="link">Register</router-link></span>
              </span>
              <span class="no-gutters cart py-1">
                <router-link :to="'/cart'" class="link">
                    <span>
                      <a-badge :count="totalItem"><a-avatar shape="square" icon="shopping-cart" /></a-badge>
                    </span>
                </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import productMixin from '@/mixins/product'
import CartService from '@/services/cart'
export default {
  name: 'header',
  mixins: [productMixin],
  data () {
    return {
      current: 1
    }
  },
  computed: {
    ...mapGetters(['customer', 'isTokenValid', 'cartId', 'isValidCartId']),
    customerName () {
      return this.customer ? this.customer.name : ''
    }
  },
  created () {
    if (!this.isTokenValid) {
      this.logout()
    }
    this.getCarts()
  },
  methods: {
    onSearch (searchWord) {
      store.commit('UPDATE_SEARCH_WORD', { searchWord })
      const findType = this.searchWord ? 'SEARCH_PRODUCTS' : 'ALL_PRODUCTS'
      this.findProdcut(this.searchWord, findType)
      if (this.searchWord) {
        this.$router.push({query: {
          q: searchWord
        }})
      }
    },
    async getCarts () {
      if (this.cartId && this.isValidCartId) {
        const response = await CartService.getAllCartItem(this.cartId)
        if (response.status === 200 && response.data) {
          const carts = response.data
          store.commit('ADD_CARTS', { carts })
        }
      }
    },
    onSearchChange (event) {
      if (event.target.value === '') {
        const searchWord = ''
        store.commit('UPDATE_SEARCH_WORD', { searchWord })
      }
    },
    logout () {
      const customer = null
      const token = null
      store.commit('UPDATE_CUSTOMER_INFO', { customer, token })
      if (this.$route.meta.requiresAuth) {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style>
  .search-bar {
    width: 200px;
  }
  .search-bar input {
    border-radius: 12px;
  }
  .ant-avatar {
    width: 24px !important;
    height: 24px !important;
    border-radius: 12px !important;
    border-radius: 50% !important;
  }
  .anticon-shopping-cart {
    vertical-align: 0.35rem !important;
    margin-left: -0.10rem  !important;
  }
  .home {
    font-family: 'Merienda', cursive;
    color: #1DA57A;
  }
  .customer-wrap {
    margin-right: 8px;
    height: 24px;
  }
  .link {
    color: #1DA57A;
  }
  .link:hover {
     color: #3db389 !important;
  }
  .name {
    color: #1DA57A;
    font-family: 'Merienda', cursive;
  }
  .logout {
    cursor: pointer;
    font-family: 'Merienda', cursive;
  }
  h3 {
    font-size: unset;
  }
  @media screen and (max-width: 768px) {
    .flex-pull-right {
      display: unset;
    }
    .cart, .search-bar {
      float: right;
    }
    .flex-pull-left {
      justify-content: space-between;
    }
  }
</style>
