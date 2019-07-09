import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layouts/Main'
import AuthLayout from '@/layouts/Auth'

Vue.use(Router)

export default new Router({
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
          component: () => import('./views/checkout')
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
