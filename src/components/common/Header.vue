<template>
<div>
  <header class="section-header">
    <section class="section-wrapper">
      <div class="container">
        <div class="row align-items-center">
          <div class="flex-pull-left col-md-6 col-lg-6 col-sm-12">
            <router-link :to="'/'" class="home py-1">
              <h3 class="primary-color">My Shop</h3>
            </router-link>
            <a-input-search
                  placeholder="search"
                  class="search-bar py-1"
                  :size="'small'"
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
                <span><router-link :to="'/customer/login'">Login</router-link></span> or
                <span><router-link :to="'/customer/register'">Register</router-link></span>
              </span>
              <span class="no-gutters cart py-1">
                <router-link :to="'/cart'" class="">
                    <span>
                      <a-badge :count="1"><a-avatar shape="square" icon="shopping-cart" /></a-badge>
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
export default {
  name: 'header',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['customer']),
    customerName () {
      return this.customer ? this.customer.name : ''
    }
  },
  mounted () {
  },
  methods: {
    onSearch (value) {
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
  a {
    color: #1DA57A;
  }
  a:hover {
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
