import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layouts/Main'
import AuthLayout from '@/layouts/Auth'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: MainLayout,
      children: [
        {
          path: '/home',
          component: () => import('./views/home')
        },
        {
          path: '/cart',
          component: () => import('./views/cart')
        },
        {
          path: '/checkout',
          component: () => import('./views/checkout'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/customer',
      component: AuthLayout,
      redirect: '/customer/login',
      children: [
        {
          path: '/customer/login',
          component: () => import('./views/customer/login')
        },
        {
          path: '/customer/register',
          component: () => import('./views/customer/register')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(store.state.customer.customer)
    if (!store.state.customer.customer) {
      next({
        path: '/customer/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

 export default router
