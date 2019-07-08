import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layouts/Main'
import LoginLayout from '@/layouts/Auth'

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
          component: () => import('./views/home/index.vue')
        }
      ]
    },
    {
      path: '/customer',
      component: LoginLayout,
      redirect: '/customer/login',
      children: [
        {
          path: '/customer/login',
          component: () => import('./views/customer/login/index.vue')
        }
      ]
    }
  ]
})
